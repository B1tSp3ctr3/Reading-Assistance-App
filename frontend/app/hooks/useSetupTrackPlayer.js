import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { useEffect, useRef } from "react";

// Global flag for player initialization status
let isPlayerInitialized = false;

const setupPlayer = async () => {
    try {
        // Only initialize if not already initialized
        if (!isPlayerInitialized) {
            await TrackPlayer.setupPlayer({
                maxCacheSize: 1024 * 5,
            });
            isPlayerInitialized = true;
        }

        await TrackPlayer.setVolume(1);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    } catch (error) {
        console.error("Failed to setup player:", error);
        throw error;
    }
};

export const useSetupTrackPlayer = ({ onLoad }) => {
    const isInitialized = useRef(false);

    useEffect(() => {
        setupPlayer()
            .then(() => {
                isInitialized.current = true;
                onLoad?.();
            })
            .catch((error) => {
                isInitialized.current = false;
                console.log("Failed to setup player:", error);
            });
    }, [onLoad]);
};

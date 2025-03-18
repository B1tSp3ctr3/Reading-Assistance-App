import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { useEffect, useRef } from "react";

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    });
    await TrackPlayer.setVolume(0.8);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await TrackPlayer.add({
        id: "track1",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        title: "SoundHelix Song 1",
        artist: "SoundHelix",
    });
    await TrackPlayer.play();
};

export const useSetupTrackPlayer = ({ onLoad }) => {
    const isInitialized = useRef(false);

    useEffect(() => {
        setupPlayer()
            .then(() => {
                isInitialized.current = true;
                onLoad?.();
            })
            .catch((err) => {
                isInitialized.current = false;
                console.error(err);
            });
    }, [onLoad]);
};

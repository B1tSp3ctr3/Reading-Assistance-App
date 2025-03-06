import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TrackPlayer, {
    State,
    usePlaybackState,
} from "react-native-track-player";

const TrackPlayerComponent = ({ track }) => {
    const playbackState = usePlaybackState();
    const [isPlaying, setIsPlaying] = useState(false);

    // Setup track player and load track
    useEffect(() => {
        const setupPlayer = async () => {
            try {
                // Check if player is already setup
                const playerState = await TrackPlayer.getState();
                if (playerState === State.None) {
                    await TrackPlayer.setupPlayer();
                }

                // Reset and add new track
                await TrackPlayer.reset();
                await TrackPlayer.add(track);
            } catch (error) {
                console.error("Error setting up track player:", error);
            }
        };

        setupPlayer();

        // Cleanup function
        return () => {
            TrackPlayer.reset();
        };
    }, [track]);

    // Handle play/pause toggle
    const togglePlayback = async () => {
        try {
            const currentState = await TrackPlayer.getState();

            if (currentState === State.Playing) {
                await TrackPlayer.pause();
                setIsPlaying(false);
            } else {
                await TrackPlayer.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Error toggling playback:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.trackInfo}>
                <Text style={styles.title} numberOfLines={1}>
                    {track.title}
                </Text>
                {track.artist && (
                    <Text style={styles.artist} numberOfLines={1}>
                        {track.artist}
                    </Text>
                )}
            </View>

            <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayback}>
                <Text style={styles.playPauseText}>{isPlaying ? "❚❚" : "▶"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginVertical: 10,
    },
    trackInfo: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    artist: {
        fontSize: 14,
        color: "#666",
    },
    playPauseButton: {
        padding: 10,
    },
    playPauseText: {
        fontSize: 20,
        color: "black",
    },
});

export default TrackPlayerComponent;

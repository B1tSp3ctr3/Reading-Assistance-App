import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import colors from "../config/colors";

export const PlayerControls = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <SkipToPreviousButton style={styles.buttonSpacing} />
                <PlayPauseButton style={styles.buttonSpacing} />
                <SkipToNextButton style={styles.buttonSpacing} />
            </View>
        </View>
    );
};

export const PlayPauseButton = ({ style, iconSize = 30 }) => {
    const isPlaying = useIsPlaying();
    return (
        <View style={[{ height: iconSize }, style]}>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={isPlaying ? TrackPlayer.pause : TrackPlayer.play}
            >
                <FontAwesome6
                    name={isPlaying ? "pause" : "play"}
                    size={iconSize}
                    color={colors.neutral}
                />
            </TouchableOpacity>
        </View>
    );
};

export const SkipToNextButton = ({ style, iconSize = 30 }) => {
    return (
        <TouchableOpacity
            style={style}
            activeOpacity={0.7}
            onPress={() => TrackPlayer.skipToNext()}
        >
            <FontAwesome6 name="forward" size={iconSize} color={colors.neutral} />
        </TouchableOpacity>
    );
};

export const SkipToPreviousButton = ({ style, iconSize = 30 }) => {
    return (
        <TouchableOpacity
            style={style}
            activeOpacity={0.7}
            onPress={() => TrackPlayer.skipToPrevious()}
        >
            <FontAwesome6 name="backward" size={iconSize} color={colors.neutral} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    // This style adds margin between buttons
    buttonSpacing: {
        marginHorizontal: 10,
    },
});

export default PlayerControls;

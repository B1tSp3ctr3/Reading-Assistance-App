import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import colors from "../config/colors";
const handleForward = async () => {
    try {
        const position = await TrackPlayer.getPosition();
        await TrackPlayer.seekTo(position + 5);
    } catch (error) {
        console.error("Error seeking forward:", error);
    }
};

// Seek backward by 5 seconds
const handleReplay = async () => {
    try {
        const position = await TrackPlayer.getPosition();
        await TrackPlayer.seekTo(Math.max(0, position - 5));
    } catch (error) {
        console.error("Error seeking backward:", error);
    }
};
export const PlayerControls = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <ReplayButton style={styles.buttonSpacing} iconSize={27} />
                <PlayPauseButton style={styles.buttonSpacing} iconSize={25} />
                <ForwardButton style={styles.buttonSpacing} iconSize={27} />
            </View>
        </View>
    );
};
export const ForwardButton = ({ style, iconSize = 30 }) => (
    <View style={[{ height: iconSize }, style]}>
        <TouchableOpacity activeOpacity={0.85} onPress={handleForward}>
            <MaterialIcons name="forward-5" size={iconSize} color={colors.neutral} />
        </TouchableOpacity>
    </View>
);

export const ReplayButton = ({ style, iconSize = 30 }) => (
    <View style={[{ height: iconSize }, style]}>
        <TouchableOpacity activeOpacity={0.85} onPress={handleReplay}>
            <MaterialIcons name="replay-5" size={iconSize} color={colors.neutral} />
        </TouchableOpacity>
    </View>
);

export const PlayPauseButton = ({ style, iconSize = 30 }) => {
    const { playing } = useIsPlaying();

    return (
        <View style={[{ height: iconSize }, style]}>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
            >
                <FontAwesome6
                    name={playing ? "pause" : "play"}
                    size={iconSize}
                    color={colors.neutral}
                />
            </TouchableOpacity>
        </View>
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

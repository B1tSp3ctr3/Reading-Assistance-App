import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useActiveTrack } from "react-native-track-player";
import { View } from "react-native";
import Icon from "./Icon";
import colors from "../config/colors";
import AppText from "./Text";
import { PlayerControls } from "./PlayerControls";
// import { SkipToNextButton } from "./PlayerControls";

export const FloatingPlayer = ({ style }) => {
    const activeTrack = useActiveTrack();
    const displayedTrack = activeTrack ?? {
        title: "Track Title",
    };

    if (!displayedTrack) return null;
    return (
        <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
            <>
                <Icon
                    name={"file"}
                    size={24}
                    backgroundColor={colors.primary}
                    iconColor={colors.neutral}
                />
                <View style={styles.trackTitleContainer}>
                    <AppText style={styles.trackTitle} numberOfLines={1}>
                        {displayedTrack.title}
                    </AppText>
                </View>
                <View style={styles.trackControlsContainer}>
                    <PlayerControls />
                </View>
            </>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.secondary,
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
    },
    trackTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    trackTitleContainer: {
        flex: 1,
        overflow: "hidden",
        marginLeft: 10,
    },
    trackControlsContainer: {
        alignItems: "center",
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16,
    },
});

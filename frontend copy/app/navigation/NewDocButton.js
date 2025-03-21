import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NewDocButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons
                    name="plus-circle"
                    color={colors.neutral}
                    size={40}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.underlayprimary,
        borderColor: colors.secondary,
        borderRadius: 40,
        borderWidth: 10,
        bottom: 20,
        height: 80,
        justifyContent: "center",
        width: 80,
    },
});

export default NewDocButton;

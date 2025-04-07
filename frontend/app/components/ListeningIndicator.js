import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VoiceContext from "../context/VoiceContext";

const ListeningIndicator = () => {
    const { isListening } = useContext(VoiceContext);

    return (
        <View style={styles.container}>
            {isListening ? (
                <MaterialCommunityIcons name="microphone" size={24} color="green" />
            ) : (
                <MaterialCommunityIcons name="microphone-off" size={24} color="red" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 20,
        bottom: 90, // Adjust based on your tab bar height
        zIndex: 10,
    },
});

export default ListeningIndicator;

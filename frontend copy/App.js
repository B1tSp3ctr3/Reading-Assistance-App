import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "./app/components/Screen";
import RootNavigator from "./app/navigation/RootNavigator";
import { SplashScreen } from "expo-router";
import { useSetupTrackPlayer } from "./app/hooks/useSetupTrackPlayer";
import apiClient from "./app/api/client";
import TrackPlayer from "react-native-track-player";
import { View, StyleSheet } from "react-native";

// SplashScreen.preventAutoHideAsync();
const audioUrl = `${apiClient.baseURL}audio/audio/67bdb3b3ef5ca4e60285a2c4`;
const track1 = {
    id: "1",
    url: audioUrl,
    title: "Example1231 Title",
    artist: "Artist Name",
};
export default function App() {
    const handleTrackPlayerLoaded = useCallback(() => {
        SplashScreen.hideAsync();
    }, []);
    useSetupTrackPlayer({
        onLoad: handleTrackPlayerLoaded,
    });
    // return (
    //     <Screen>
    //         <View style={styles.container}>
    //             <TrackPlayerComponent track={track1} />
    //             {/* Add more instances with different tracks if needed */}
    //         </View>
    //     </Screen>
    // );
    return (
        <Screen>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </Screen>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
    },
});

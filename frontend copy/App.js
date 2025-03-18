import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "./app/components/Screen";
import RootNavigator from "./app/navigation/RootNavigator";
import { SplashScreen } from "expo-router";
import { useSetupTrackPlayer } from "./app/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "./app/hooks/useLogTrackPlayerState";
import { StyleSheet } from "react-native";

// SplashScreen.preventAutoHideAsync();
export default function App() {
    const handleTrackPlayerLoaded = useCallback(() => {
        SplashScreen.hideAsync();
    }, []);
    useSetupTrackPlayer({
        onLoad: handleTrackPlayerLoaded,
    });
    useLogTrackPlayerState();
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

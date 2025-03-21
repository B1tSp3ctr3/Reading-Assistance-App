import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "./app/components/Screen";
import RootNavigator from "./app/navigation/RootNavigator";
import { SplashScreen } from "expo-router";
import { useSetupTrackPlayer } from "./app/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "./app/hooks/useLogTrackPlayerState";

SplashScreen.preventAutoHideAsync();
export default function App() {
    const handleTrackPlayerLoaded = useCallback(() => {
        SplashScreen.hideAsync();
    }, []);
    useSetupTrackPlayer({
        onLoad: handleTrackPlayerLoaded,
    });
    useLogTrackPlayerState();
    return (
        <Screen>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </Screen>
    );
}

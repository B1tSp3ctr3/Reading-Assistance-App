import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import Screen from "./app/components/Screen";
import { useLogTrackPlayerState } from "./app/hooks/useLogTrackPlayerState";
import { useSetupTrackPlayer } from "./app/hooks/useSetupTrackPlayer";
import RootNavigator from "./app/Navigation/RootNavigator";
import { createPicovoiceManager } from "./app/helpers/PicovoiceManagerService";
import { requestRecordAudioPermission } from "./app/helpers/voicePermissions";
import * as Speech from "expo-speech";
import VoiceContext from "./app/context/VoiceContext";

SplashScreen.preventAutoHideAsync();
import { View, Text } from "react-native";
export default function App() {
    const [picovoiceManager, setPicovoiceManager] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [activeCommand, setActiveCommand] = useState(null);

    useEffect(() => {
        const appInfo =
            "Welcome to the Reading Assistance App. This app provides voice controlled reading assistance for your convenience. To use voice commands simply say Hello App followed by the command. For example, Hello App, play. To list all the available commands say Hello App, help.";
        Speech.speak(appInfo);
        let managerInstance = null;
        async function initVoiceRecognition() {
            const hasPermission = await requestRecordAudioPermission();
            if (!hasPermission) {
                console.error("Missing microphone permission");
                return;
            }

            try {
                const manager = await createPicovoiceManager();
                // Call start() and wait for it to resolve.
                await manager.start();
                console.log("manager.start() resolved.", manager);
                // If available, check the internal listening state.
                if (manager._isListening !== undefined) {
                    console.log("Manager listening state:", manager._isListening);
                } else {
                    console.log(
                        "No explicit listening state available; assuming start() succeeded.",
                    );
                }

                // Since no error was thrown, assume it started successfully.
                managerInstance = manager;
                setPicovoiceManager(manager);
                setIsListening(true);
                console.log("PicovoiceManager started successfully");
            } catch (e) {
                console.error("Error starting PicovoiceManager:", e, e.code);
            }
        }
        initVoiceRecognition();

        // Cleanup on unmount.
        return () => {
            if (managerInstance) {
                managerInstance.stop();
                // Optionally, release resources:
                // managerInstance.release();
            }
        };
    }, []);
    const handleTrackPlayerLoaded = useCallback(() => {
        SplashScreen.hideAsync();
    }, []);
    useSetupTrackPlayer({
        onLoad: handleTrackPlayerLoaded,
    });
    useLogTrackPlayerState();
    return (
        <VoiceContext.Provider value={{ isListening, setIsListening }}>
            <Screen>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </Screen>
        </VoiceContext.Provider>
    );
}

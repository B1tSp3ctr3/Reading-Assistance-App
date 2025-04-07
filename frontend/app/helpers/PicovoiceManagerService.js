import { PicovoiceManager } from "@picovoice/picovoice-react-native";
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import extractAssetFile from "./AssetExtractor";
import TrackPlayer from "react-native-track-player";
import { handleForward, handleReplay } from "../components/PlayerControls";
import * as Speech from "expo-speech";
// Define empty callbacks (you can add your own logic later).
function wakeWordCallback(keywordIndex) {
    console.log("Wake word detected at index:", keywordIndex);
    TrackPlayer.pause();
}

function inferenceCallback(inference) {
    console.log("Inference received:", inference);
    if (inference._isUnderstood) {
        console.log("Command understood:", inference._intent);
        if (inference._intent === "play") {
            Speech.speak("Playing track", {
                onDone: () => {
                    TrackPlayer.play();
                },
            });
        } else if (inference._intent === "pause") {
            Speech.speak("Pausing track", {
                onDone: () => {
                    TrackPlayer.pause();
                },
            });
        } else if (inference._intent === "forward") {
            handleForward();
        } else if (inference._intent === "rewind") {
            handleReplay();
        } else if (inference._intent === "help") {
            const helpMessage = `Here are the available voice commands:
      - Say "play" to start playing the current track.
      - Say "pause" to pause the track.
      - Say "forward" to skip forward 10 seconds.
      - Say "rewind" to rewind 10 seconds .`;
            Speech.speak(helpMessage);
        } else {
            console.log("Command not understood:", inference._intent);
            Speech.speak("Command not understood, please try again");
        }
    }
}

async function createPicovoiceManager() {
    const accessKey = "W0NvY5Wq4QDj7mXhzWmR5wP0SLgpNmIl/ihtSZNeDMPZdHgjJjlLMg==";
    let keywordPath, contextPath;

    if (Platform.OS === "android") {
        // Extract the files from the compressed assets folder to persistent storage.
        try {
            keywordPath = await extractAssetFile("keyword.ppn", "keyword.ppn");
            contextPath = await extractAssetFile("context.rhn", "context.rhn");
        } catch (err) {
            console.error("Failed to extract model files:", err);
            return null;
        }
    } else {
        // For iOS, if the files are added to the bundle, use:
        keywordPath = `${RNFS.MainBundlePath}/keyword.ppn`;
        contextPath = `${RNFS.MainBundlePath}/context.rhn`;
    }
    try {
        // Make sure to use the correct parameter order:
        const picovoiceManager = await PicovoiceManager.create(
            accessKey,
            keywordPath,
            wakeWordCallback, // Callback for wake word detection.
            contextPath,
            inferenceCallback, // Callback for inference results.
            (error) => {
                console.error("Error creating PicovoiceManager:", error);
            },
            0.5,
            0.5,
        );
        return picovoiceManager;
    } catch (error) {
        console.error("Error creating PicovoiceManager:", error);
        return null;
    }
}

export { createPicovoiceManager, wakeWordCallback, inferenceCallback };

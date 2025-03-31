// permissions.js
import { PermissionsAndroid, Platform } from "react-native";

export async function requestRecordAudioPermission() {
    if (Platform.OS === "android") {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: "Microphone Permission",
                    message:
                        "This app requires access to your microphone for voice recognition.",
                    buttonPositive: "OK",
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    return true; // iOS will prompt automatically.
}

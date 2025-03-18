import * as FileSystem from "expo-file-system";

export const writeBase64ToFile = async (
    base64Data,
    fileName = "tempAudio.mp3",
) => {
    const fileUri = FileSystem.documentDirectory + fileName;
    try {
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return fileUri;
    } catch (error) {
        console.error("Error writing audio file", error);
        throw error;
    }
};

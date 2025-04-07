import RNFS from "react-native-fs";

/**
 * Extract a file from the android_asset folder to the app's document directory.
 * @param {string} assetFileName - The file name (with any subdirectories) within android_asset.
 * @param {string} destinationFileName - The name for the copied file in persistent storage.
 * @returns {Promise<string>} - The path to the extracted file.
 */
export default async function extractAssetFile(
    assetFileName,
    destinationFileName,
) {
    // Path to the asset file (relative path inside android/app/src/main/assets/)
    // For example, if your file is in android/app/src/main/assets/keyword.ppn, assetFileName is "keyword.ppn"
    try {
        // Read the file from assets as base64.
        const base64Data = await RNFS.readFileAssets(assetFileName, "base64");
        // Destination path in the persistent storage.
        const destPath = `${RNFS.DocumentDirectoryPath}/${destinationFileName}`;
        // Write the base64 data to the destination.
        await RNFS.writeFile(destPath, base64Data, "base64");
        return destPath;
    } catch (error) {
        console.error("Error extracting asset file:", error);
        throw error;
    }
}

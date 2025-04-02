import Text from "../models/text.js";

export const textSaveController = async (req, res) => { 
    // Saving the text to the database using Try and catch
    try {
        const { text, title, textFileName, textFilePath, fileURL } = req.body;
        const newText = new Text({ text:text , title:title, textFileName:textFileName , textFilePath:textFilePath, fileURL:fileURL });
        await newText.save();
        return res.sendStatus(200);
    } catch (error) {
        console.error("Error saving text:", error);
        return res.status(500).json({ error: "Unable to save text" });
    }
}
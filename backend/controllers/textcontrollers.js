import Tesseract from "tesseract.js";
import path from "path";
import fs from "fs";
import Text from "../models/text.js";

export const recognizeText = async (req, res) => {
  // console.log(req);
  try {
    const files = req.files;
    const title = req.body.title;
    if (!files) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    // Create an array of promises, one for each image
    const ocrPromises = files.map(async (file) => {
      try {
        // Process each image with Tesseract
        const result = await Tesseract.recognize(file.path, "eng");
        // Return the OCR text for this image
        return result.data.text;
      } catch (err) {
        console.error(`Error processing ${file.filename}:`, err);
        // Return an empty string so that we still get a result in that position
        return "";
      }
    });

    // Wait for all promises to resolve; Promise.all preserves order
    const extractedTexts = await Promise.all(ocrPromises);

    // Join all extracted texts
    const text = extractedTexts.join("\n");
    // const image = req.file.path;
    // const fileName = req.file.filename;

    // const result = await Tesseract.recognize(image, "eng");
    // console.log(result.data.text);

    // const textFileName = fileName.substring(0, fileName.lastIndexOf('.')) + '.txt'; // Remove the image extension and add '.txt'
    const timestamp = Date.now(); // Get current timestamp
    const textFileName = `${timestamp}.txt`;
    const textFilePath = path.join("./texts", textFileName);

    // Ensuring the "texts" folder exists (creating it if it doesn't)
    const textDir = path.join("./texts");
    if (!fs.existsSync(textDir)) {
      fs.mkdirSync(textDir, { recursive: true }); // Any necessary parent directories are created
    }

    fs.writeFileSync(textFilePath, text);

   // storing the text in the database
    try {
      const newText = new Text({
        title: title,
        text: text,
        textFileName: textFileName,
        textFilePath: textFilePath,
      });
      await newText.save();
    } catch (error) {
      console.error("Error saving text to database:", error);
      return res.status(500).json({ error: "Error saving text to database" });
    }

    return res.json({
      text: text,
      title: title,
      textFileName: textFileName,
      textFilePath: textFilePath,
    });
  } catch (err) {
    console.error("Error during text recognition:", err);
    return res.status(500).json({ error: err.message });
  }
};

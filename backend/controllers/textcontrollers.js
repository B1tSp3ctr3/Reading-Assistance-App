import Tesseract from "tesseract.js";
import path from "path";
import fs from "fs";

export const recognizeText = async (req, res) => {
  try {
    const image = req.file.path;
    const fileName = req.file.filename;

    const result = await Tesseract.recognize(image, "eng");
    console.log(result.data.text);

    const textFileName = fileName.substring(0, fileName.lastIndexOf('.')) + '.txt'; // Remove the image extension and add '.txt'
    const textFilePath = path.join('./texts', textFileName);

    // Ensuring the "texts" folder exists (creating it if it doesn't)
    const textDir = path.join('./texts');
    if (!fs.existsSync(textDir)) {
      fs.mkdirSync(textDir, { recursive: true }); // Any necessary parent directories are created
    }

    fs.writeFileSync(textFilePath, result.data.text);

    return res.json({
      text: result.data.text,
      title: fileName,
      textFileName: textFileName,
      textFilePath: textFilePath
    });
  } catch (err) {
    console.error("Error during text recognition:", err);
    return res.status(500).json({ error: err.message });
  }
};
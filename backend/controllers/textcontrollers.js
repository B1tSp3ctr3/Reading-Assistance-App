import Tesseract from "tesseract.js";

export const recognizeText = async (req, res) => {
  try {
    const image = req.file.path;
    const result = await Tesseract.recognize(image, "eng");
    console.log(result.data.text);
     return res.json({ text: result.data.text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
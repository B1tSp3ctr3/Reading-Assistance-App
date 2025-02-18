import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import dotenv from "dotenv";  
dotenv.config();
const client = new textToSpeech.TextToSpeechClient();

export const convertToSpeech = async (req, res) => {
  try {
    const { text } = req.body;
    const request = {
      input: { text },
      voice: { languageCode: "hi-IN", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    const filePath = `audio-${Date.now()}.mp3`;
    await writeFile(filePath, response.audioContent, "binary");
    res.download(filePath, () => {
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import { promisify } from "util";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
// Set up Google Cloud authentication
// process.env.GOOGLE_APPLICATION_CREDENTIALS = "path_to_your_service_account.json";

// Initialize Google Cloud TTS client
const client = new textToSpeech.TextToSpeechClient();


// Define the directory for storing audio files
const audioDir = path.join(process.cwd(), "public/audio");

// Ensure directory exists
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Route: Text-to-Speech
export const Convert =  async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required!" });

        // Define speech synthesis request
        const request = {
            input: { text },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
        };

        // Convert text to speech
        const [response] = await client.synthesizeSpeech(request);

        // Define local file path
        const fileName = `output-${Date.now()}.mp3`;
        const filePath = path.join(audioDir, fileName);

        // Save audio file locally
        await promisify(fs.writeFile)(filePath, response.audioContent, "binary");

        // Construct file URL
        const audioURL = `/audio/${fileName}`;

        // Send response
        res.json({ success: true, audioURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing text-to-speech." });
    }
};

// Serve static files from "public/audio"
// app.use("/audio", express.static(audioDir));


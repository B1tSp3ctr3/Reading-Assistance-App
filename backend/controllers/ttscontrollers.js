import textToSpeech from "@google-cloud/text-to-speech";
import mongoose from "mongoose";
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

    // Ensure the database connection is open
    if (!mongoose.connection.db) {
      return res.status(500).json({ error: "Database connection not established" });
    }

    // Create a GridFS bucket instance
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "audio",
    });

    // Create a writable stream for GridFS
    const filename = `audio-${Date.now()}.mp3`;
    const uploadStream = bucket.openUploadStream(filename);

    // Write audio content to GridFS
    // uploadStream.end(response.audioContent);
    uploadStream.end(Buffer.from(response.audioContent, "binary"));


    uploadStream.on("finish", () => {
      res.json({
        message: "Audio saved in MongoDB!",
        fileID: uploadStream.id,
      });
    });

    uploadStream.on("error", (err) => {
      console.error("GridFS Upload Error:", err);
      res.status(500).json({ error: "Error storing file in MongoDB" });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


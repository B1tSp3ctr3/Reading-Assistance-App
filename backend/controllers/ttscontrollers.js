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
    uploadStream.end(response.audioContent);

    uploadStream.on("finish", () => {
      res.json({
        message: "Audio saved in MongoDB!",
        fileId: uploadStream.id,
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


// import textToSpeech from "@google-cloud/text-to-speech";
// // import { gfs } from "../config/db";
// import connectDB from "../config/db";
// import { GridFsStorage } from "multer-gridfs-storage";
// import mongoose from "mongoose";
// import multer from "multer";
// import fs from "fs";
// import util from "util";
// import dotenv from "dotenv";
// dotenv.config();

// // Setup GridFS Storage
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI,
//   file: (req, file) => {
//     return {
//       filename: `audio-${Date.now()}.mp3`,
//       bucketName: "audio",
//     };
//   },
// });

// const upload = multer({ storage });

// const client = new textToSpeech.TextToSpeechClient();

// export const convertToSpeech = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const request = {
//       input: { text },
//       voice: { languageCode: "hi-IN", ssmlGender: "NEUTRAL" },
//       audioConfig: { audioEncoding: "MP3" },
//     };
//     const [response] = await client.synthesizeSpeech(request);

//     //   const writeFile = util.promisify(fs.writeFile);
//     //   const filePath = `audio-${Date.now()}.mp3`;
//     //   await writeFile(filePath, response.audioContent, "binary");
//     //   res.download(filePath, () => {
//     //     fs.unlinkSync(filePath);
//     //   });
//     // } catch (err) {
//     //   res.status(500).json({ error: err.message });
//     // }
//     // Convert Buffer to a Readable Stream
//     const readableStream = new mongoose.mongo.GridFSBucket(connectDB.db, {
//       bucketName: "audio",
//     }).openUploadStream(`audio-${Date.now()}.mp3`);

//     readableStream.end(response.audioContent);

//     readableStream.on("finish", () => {
//       res.json({
//         message: "Audio saved in MongoDB!",
//         fileId: readableStream.id,
//       });
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

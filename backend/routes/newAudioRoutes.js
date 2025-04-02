import express from "express";
import { convertToSpeech } from "../controllers/newAudioController.js"
import { getAudioFile } from "../controllers/fileController.js";

const router = express.Router();

// Route to convert text to speech and store audio
router.post("/convert", convertToSpeech);

// Route to fetch stored audio
router.get("/:fileId", getAudioFile);

export default router;

import express from "express";
import { convertToSpeech } from "../controllers/ttscontrollers.js";

const router = express.Router();

router.post("/speak", convertToSpeech);

export default router;
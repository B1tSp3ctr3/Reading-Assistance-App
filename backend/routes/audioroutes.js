import express from "express";
import { audioController } from "../controllers/audiocontrollers.js";
const router = express.Router();
router.get("/audio/:fileURL",audioController);


export default router;
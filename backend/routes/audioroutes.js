import express from "express";
import { audioController } from "../controllers/audiocontrollers.js";
const router = express.Router();
router.get("/audio/:fileId",audioController);


export default router;
import express from "express";
import multer from "multer";
import { recognizeText } from "../controllers/textcontrollers.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/recognize", upload.single("image"), recognizeText);

export default router;
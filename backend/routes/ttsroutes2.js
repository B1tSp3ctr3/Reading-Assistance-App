import express from "express";
import { Convert } from "../controllers/ttscontrollers2.js";

const router = express.Router();

router.post("/speak", Convert);

export default router;
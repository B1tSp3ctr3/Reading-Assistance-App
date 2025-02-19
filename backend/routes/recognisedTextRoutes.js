import express from "express";
import { recognisedTextController } from "../controllers/recognisedTextController.js";
const router = express.Router();
router.get("/texts",recognisedTextController);


export default router;
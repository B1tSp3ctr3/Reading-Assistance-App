import express from 'express';
import { textSaveController } from '../controllers/textSaveController.js';


const router = express.Router();
router.post('/saveText', textSaveController);
export default router;
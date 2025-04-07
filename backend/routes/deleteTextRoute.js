import express from 'express';
import { deleteTextController } from '../controllers/deleteTextController.js';
const router = express.Router();

router.delete('/:id', deleteTextController);
export default router;
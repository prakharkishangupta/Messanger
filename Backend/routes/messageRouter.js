import express from 'express';
import { getMessage, sendMessage } from '../controler/message.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/send/:id', authMiddleware, sendMessage);
router.get('/get/:id', authMiddleware, getMessage)

export default router;
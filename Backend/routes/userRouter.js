import express from "express";
import { signup, login, logout, getUserProfile } from "../controler/user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/getUserProfile', authMiddleware, getUserProfile)

export default router;
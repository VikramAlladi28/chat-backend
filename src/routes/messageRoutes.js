import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    sendMessage,
    fetchMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, fetchMessages);

export default router;

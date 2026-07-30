import express from "express";
import { handleChatbotMessage } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/message", handleChatbotMessage);

export default router;

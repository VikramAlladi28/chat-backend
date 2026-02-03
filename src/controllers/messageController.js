import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
    const { chatId, content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Message empty" });
    }

    const message = await Message.create({
        sender: req.user.id,
        chat: chatId,
        content,
    });

    await Chat.findByIdAndUpdate(chatId, {
        lastMessage: message._id,
    });

    const fullMessage = await Message.findById(message._id)
        .populate("sender", "name email")
        .populate("chat");

    res.status(201).json(fullMessage);
};


export const fetchMessages = async (req, res) => {
    const { chatId } = req.query;

    try {
        if (!chatId) {
            return res.status(400).json({ message: "Chat ID is required" });
        }
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name email")
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
};

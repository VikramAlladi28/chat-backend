import Chat from "../models/Chat.js";

export const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "UserId required" });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
        isGroupChat: false,
        members: { $all: [req.user.id, userId] },
    }).populate("members", "-password");

    if (chat) return res.json(chat);

    // Create new chat
    const newChat = await Chat.create({
        members: [req.user.id, userId],
    });

    const fullChat = await Chat.findById(newChat._id).populate(
        "members",
        "-password"
    );

    res.status(201).json(fullChat);
};


export const fetchChats = async (req, res) => {
    const chats = await Chat.find({
        members: { $in: [req.user.id] },
    })
        .populate("members", "-password")
        .populate("lastMessage")
        .sort({ updatedAt: -1 });

    res.json(chats);
};

// chatRtdbController.js
import admin, { db } from "../services/firebaseAdmin.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const bucket = admin.storage().bucket();
import { ref, push, set, update, get, child, query, orderByChild, equalTo } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export async function sendMessageRTDB(req, res, next) {
  try {
    const { buyerId, sellerId, productId, text, imageUrl } = req.body;
    if (!buyerId || !sellerId || !productId || (!text && !imageUrl)) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const chatsRef = ref(db, "chats");
    let chatId = `${productId}_${buyerId}_${sellerId}`;
    const chatRef = ref(db, `chats/${chatId}`);

    const msgId = uuidv4();
    const msgData = {
      senderId: buyerId,
      text: text || "",
      imageUrl: imageUrl || "",
      createdAt: Date.now(),
    };

    await set(ref(db, `chats/${chatId}/messages/${msgId}`), msgData);

    await update(chatRef, {
      productId,
      participants: { [buyerId]: true, [sellerId]: true },
      lastMessage: { ...msgData },
      updatedAt: Date.now(),
    });

    res.json({ success: true, chatId, msgId });
  } catch (err) {
    next(err);
  }
}

// Get all chats for a user
export async function getUserChatsRTDB(req, res, next) {
  try {
    const { userId } = req.params;
    const chatsSnap = await get(ref(db, "chats"));
    const allChats = chatsSnap.val() || {};
    const result = [];

    for (let [cid, c] of Object.entries(allChats)) {
      if (c.participants && c.participants[userId]) {
        result.push({ id: cid, ...c });
      }
    }

    result.sort((a, b) => b.updatedAt - a.updatedAt);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// Get messages in a chat
export async function getChatMessagesRTDB(req, res, next) {
  try {
    const { chatId } = req.params;
    const msgsSnap = await get(ref(db, `chats/${chatId}/messages`));
    const messages = [];
    const val = msgsSnap.val() || {};
    for (let [id, msg] of Object.entries(val)) {
      messages.push({ id, ...msg });
    }
    messages.sort((a, b) => a.createdAt - b.createdAt);
    res.json(messages);
  } catch (err) {
    next(err);
  }
}
//Upload Files on Firebase Storage
export const uploadFile = [
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    try {
      const ts          = Date.now();
      const name        = req.file.originalname;
      const dest        = `chats/${ts}_${name}`;
      const file        = bucket.file(dest);

      // save buffer
      await file.save(req.file.buffer, {
        metadata: { contentType: req.file.mimetype }
      });
      // make it public (or generate signed URL if you prefer)
      await file.makePublic();

      return res.json({ downloadURL: file.publicUrl() });
    } catch (err) {
      console.error("Upload failed:", err);
      return res.status(500).json({ error: "Upload failed" });
    }
  }
];
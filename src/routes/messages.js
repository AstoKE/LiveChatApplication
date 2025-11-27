const express = require("express");
const router = express.Router();

const { sendMessageToStream } = require("../messaging/producer");
const messageService = require("../services/messageService");

// GET /messages → DB'deki tüm mesajları getir
router.get("/", async (req, res) => {
  try {
    const msgs = await messageService.getAllMessages();
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mesajlar alınamadı" });
  }
});

// POST /messages → Mesajı Redis Stream'e yaz
router.post("/", async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: "userId ve content gerekli" });
  }

  try {
    const streamId = await sendMessageToStream(userId, content);

    return res.status(202).json({
      status: "queued",
      streamId: streamId,
      message: "Mesaj kuyruğa alındı. Consumer tarafından işlenecek."
    });
  } catch (err) {
    console.error("Producer Error:", err);
    return res.status(500).json({ error: "Mesaj Redis'e yazılamadı" });
  }
});

module.exports = router;
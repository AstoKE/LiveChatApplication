const express = require("express");
const router = express.Router();

const { sendMessageToStream } = require("../messaging/producer");
const messageService = require("../services/messageService");
const userService = require("../services/userService");

// GET /messages → DB'deki tüm mesajlar
router.get("/", async (req, res) => {
  try {
    const msgs = await messageService.getAllMessages();
    res.json({ data: msgs });
  } catch (err) {
    console.error("GET /messages error:", err);
    res.status(500).json({ error: "Mesajlar alınamadı" });
  }
});

// POST /messages → Redis Stream'e mesaj gönder
router.post("/", async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Validation
    if (!userId || content == null || content.trim() === "") {
      return res.status(400).json({ error: "userId ve content gerekli" });
    }

    if (isNaN(parseInt(userId))) {
      return res.status(400).json({ error: "userId sayısal olmalıdır" });
    }

    // User exist check
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Gönderilen userId için kullanıcı bulunamadı" });
    }

    // Redis'e gönder
    const streamId = await sendMessageToStream(userId, content);

    return res.status(202).json({
      status: "queued",
      streamId,
      message: "Mesaj kuyruğa alındı. Consumer tarafından işlenecek."
    });

  } catch (err) {
    console.error("POST /messages error:", err);
    return res.status(500).json({ error: "Mesaj Redis'e yazılamadı" });
  }
});

module.exports = router;
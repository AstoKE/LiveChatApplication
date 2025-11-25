const express = require("express");
const messageService = require("../services/messageService");
const router = express.Router();

router.get("/", async (req, res) => {
  const msgs = await messageService.getAllMessages();
  res.json(msgs);
});

router.post("/", async (req, res) => {
  const msg = await messageService.createMessage(req.body);
  res.status(201).json(msg);
});

module.exports = router;

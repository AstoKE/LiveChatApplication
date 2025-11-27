const express = require("express");
const userService = require("../services/userService");
const router = express.Router();

// GET /users → tüm kullanıcılar
router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json({ data: users });
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: "Kullanıcılar alınamadı" });
  }
});

// GET /users/:id → tek kullanıcı
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    res.json({ data: user });
  } catch (err) {
    console.error("GET /users/:id error:", err);
    res.status(500).json({ error: "Kullanıcı alınamadı" });
  }
});

// POST /users → yeni kullanıcı
router.post("/", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "username gerekli" });
    }

    const user = await userService.createUser({ username });

    res.status(201).json({ data: user });
  } catch (err) {
    console.error("POST /users error:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
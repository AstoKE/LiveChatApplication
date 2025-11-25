
const express = require("express");
const userService = require("../services/userService");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

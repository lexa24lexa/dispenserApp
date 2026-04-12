const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;

// db connection test
(async () => {
  try {
    await db.execute("SELECT 1");
    console.log("connected to MySQL");
  } catch (err) {
    console.error("db connection failed:", err);
  }
})();

// routes with auth
app.use("/api", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("api is running");
});

// backend working
app.get("/api/test", (req, res) => {
  res.json({ message: "backend connected" });
});

// list of users - teachers only
app.get("/api/users", authMiddleware, roleMiddleware(["teacher"]), async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// list of logs - teachers only
app.get("/api/logs", authMiddleware, roleMiddleware(["teacher"]), async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM logs");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// list of drawers - read-only
app.get("/api/drawers", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM drawers");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post a scan with log movement
app.post("/api/scan", authMiddleware, async (req, res) => {
  const { card_uid } = req.body;

  try {
    const [users] = await db.execute(
      "SELECT * FROM users WHERE card_uid = ?",
      [card_uid]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    await db.execute("UPDATE drawers SET is_locked = false WHERE id = 1");

    await db.execute(
      "INSERT INTO logs (user_id, drawer_id, action) VALUES (?, ?, 'unlock')",
      [user.id, 1]
    );

    res.json({
      message: "drawer unlocked",
      user: user.name,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
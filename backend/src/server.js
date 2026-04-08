const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "backend connected" });
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

app.get("/api/drawers", (req, res) => {
  db.query("SELECT * FROM drawers", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

app.post("/api/scan", (req, res) => {
  const { card_uid } = req.body;

  // 1. finding the user
  db.query("SELECT * FROM users WHERE card_uid = ?", [card_uid], (err, users) => {
    if (err) return res.status(500).json(err);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // 2. unlocks first drawer (and only)
    db.query("UPDATE drawers SET is_locked = false WHERE id = 1", (err) => {
      if (err) return res.status(500).json(err);

      // 3. logs the move
      db.query(
        "INSERT INTO logs (user_id, drawer_id, action) VALUES (?, ?, 'unlock')",
        [user.id, 1],
        (err) => {
          if (err) return res.status(500).json(err);

          res.json({
            message: "drawer unlocked",
            user: user.name
          });
        }
      );
    });
  });
});

app.get("/api/logs", (req, res) => {
  db.query("SELECT * FROM logs", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
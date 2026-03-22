const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "dispenser_db"
});

db.connect(err => {
  if (err) {
    console.error("db connection failed:", err);
  } else {
    console.log("connected to MySQL");
  }
});

module.exports = db;
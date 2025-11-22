const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // 👈 your MySQL username
  password: "root",   // 👈 your MySQL password
  database: "booknest"
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected...");
});

module.exports = db;

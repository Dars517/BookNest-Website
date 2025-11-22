const db = require("../config/db");

// Add to Wishlist
exports.addToWishlist = (req, res) => {
  const { user_id, book_id } = req.body;
  db.query(
    "INSERT INTO wishlist (user_id, book_id) VALUES (?, ?)",
    [user_id, book_id],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Book added to wishlist!" });
    }
  );
};

// Get Wishlist
exports.getWishlist = (req, res) => {
  const userId = req.params.userId;
  db.query(
    `SELECT w.id, b.title, b.author, b.price, b.image
     FROM wishlist w
     JOIN books b ON w.book_id = b.id
     WHERE w.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Remove from Wishlist
exports.removeFromWishlist = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM wishlist WHERE id = ?", [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Removed from wishlist" });
  });
};

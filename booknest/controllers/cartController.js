const db = require("../config/db");

// Add to Cart
exports.addToCart = (req, res) => {
  const { user_id, book_id, quantity } = req.body;
  db.query(
    "INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
    [user_id, book_id, quantity, quantity],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Book added to cart!" });
    }
  );
};

// Get Cart
exports.getCart = (req, res) => {
  const userId = req.params.userId;
  db.query(
    `SELECT c.id, b.title, b.author, b.price, b.image, c.quantity
     FROM cart c
     JOIN books b ON c.book_id = b.id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Remove from Cart
exports.removeFromCart = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM cart WHERE id = ?", [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Removed from cart" });
  });
};


exports.updateQuantity = (req, res) => {
  const { quantity } = req.body;
  db.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Cart updated' });
  });
};


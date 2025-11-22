const db = require("../config/db");

// Get all books
exports.getBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get book by ID
exports.getBookById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

//  For Admin page.
// Add Book
exports.addBook = (req, res) => {
  let { title, author, category, price, image } = req.body;

  if (!title || !author || !category || !price || !image) {
    return res.status(400).json({ error: "All fields required" });
  }

  price = parseFloat(price);
  if (isNaN(price)) {
    return res.status(400).json({ error: "Invalid price value" });
  }

  const sql = "INSERT INTO books (title, author, category, price, image) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, author, category, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Book added successfully!" });
  });
};


exports.updateBook = (req, res) => {
  const { title, author, category, price, image } = req.body;
  db.query(
    'UPDATE books SET title=?, author=?, category=?, price=?, image=? WHERE id=?',
    [title, author, category, price, image, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Book updated' });
    }
  );
};

exports.deleteBook = (req, res) => {
  db.query('DELETE FROM books WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Book deleted' });
  });
};

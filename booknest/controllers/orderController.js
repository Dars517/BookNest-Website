const db = require("../config/db");

// Place Order
exports.placeOrder = (req, res) => {
  const { user_id, total_price, fullname, address, phone, payment } = req.body;

  // Step 1: Insert into orders
  db.query(
    "INSERT INTO orders (user_id, total_price, fullname, address, phone, payment, status) VALUES (?, ?, ?, ?, ?, ?, 'Pending')",
    [user_id, total_price, fullname, address, phone, payment],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      const orderId = result.insertId;

      // Step 2: Get items from cart
      db.query(
        `SELECT c.book_id, c.quantity, b.price 
         FROM cart c JOIN books b ON c.book_id = b.id 
         WHERE c.user_id = ?`,
        [user_id],
        (cartErr, cartItems) => {
          if (cartErr) return res.status(500).json({ error: cartErr.message });

          if (!cartItems.length) {
            return res.status(400).json({ message: "Cart is empty" });
          }

          // Step 3: Insert into order_items
          const values = cartItems.map(item => [orderId, item.book_id, item.quantity, item.price]);
          db.query(
            "INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ?",
            [values],
            (itemsErr) => {
              if (itemsErr) return res.status(500).json({ error: itemsErr.message });

              // Step 4: Clear cart
              db.query("DELETE FROM cart WHERE user_id = ?", [user_id], (clearErr) => {
                if (clearErr) return res.status(500).json({ error: clearErr.message });

                res.json({
                  message: "Order placed successfully! Cart cleared.",
                  orderId
                });
              });
            }
          );
        }
      );
    }
  );
};

// Get Orders with Items
exports.getOrders = (req, res) => {
  const userId = req.params.userId;

  db.query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [userId], (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!orders.length) return res.json([]);

    const orderIds = orders.map(o => o.id);
    db.query(
      `SELECT oi.order_id, b.title, b.image, oi.quantity, oi.price 
       FROM order_items oi 
       JOIN books b ON oi.book_id = b.id
       WHERE oi.order_id IN (?)`,
      [orderIds],
      (itemsErr, items) => {
        if (itemsErr) return res.status(500).json({ error: itemsErr.message });

        const ordersWithItems = orders.map(order => ({
          ...order,
          items: items.filter(i => i.order_id === order.id)
        }));

        res.json(ordersWithItems);
      }
    );
  });
};


// ✅ NEW: Get All Orders (for Admin)
/*exports.getAllOrders = (req, res) => {
  db.query(
    `SELECT o.id, o.user_id, u.name AS customer, o.total_price, o.status, o.created_at 
     FROM orders o 
     JOIN users u ON o.user_id = u.id 
     ORDER BY o.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
}; */

exports.getAllOrders = (req, res) => {
  db.query(
    "SELECT o.*, u.name AS customer FROM orders o JOIN users u ON o.user_id = u.id",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};


// ✅ Update Order Status
exports.updateOrderStatus = (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  db.query(
    "UPDATE orders SET status = ? WHERE id = ?",
    [status, orderId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: `Order marked as ${status}` });
    }
  );
};
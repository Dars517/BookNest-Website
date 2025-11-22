const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// User routes
router.post("/", orderController.placeOrder);
router.get("/:userId", orderController.getOrders);

// ✅ Admin routes
router.get("/", orderController.getAllOrders); 
router.put("/:id", orderController.updateOrderStatus);

module.exports = router;


//const express = require("express");
//const router = express.Router();
//const orderController = require("../controllers/orderController");

//router.post("/", orderController.placeOrder);
//router.get("/:userId", orderController.getOrders);
// router.put("/:orderId/status", orderController.updateStatus); // NEW

//module.exports = router;


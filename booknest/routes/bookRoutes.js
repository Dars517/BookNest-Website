const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/", bookController.addBook);
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.delete("/:id", bookController.deleteBook);

module.exports = router;

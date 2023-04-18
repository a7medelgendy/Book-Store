const express = require("express");
const router = express.Router();
const bookCtrl = require("../controller/book.controller");

router.get("/", bookCtrl.getBookList);
router.post("/save", bookCtrl.saveBook);
router.get("/details/:bookId", bookCtrl.getBookDetails);
router.put("/update", bookCtrl.updateBook);
router.delete("/delete/:bookId", bookCtrl.deleteBook);

module.exports = router;
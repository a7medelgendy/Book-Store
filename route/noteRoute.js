const express = require("express");
const router = express.Router();
const noteCtrl = require("../controller/noteController");

router.get("/", noteCtrl.getAllNotes);
router.post("/save", noteCtrl.saveNote);
router.put("/update", noteCtrl.updateNote);
router.delete("/delete/:noteId", noteCtrl.deleteNote);

module.exports = router;

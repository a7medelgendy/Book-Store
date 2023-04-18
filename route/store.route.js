const express = require("express");
const router = express.Router();
const storeCtrl = require("../controller/store.controller");

router.get("/", storeCtrl.getStoreList);
router.post("/save", storeCtrl.saveStore);


module.exports = router;
const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');

router.get("/", userCtrl.getUserList);
router.post("/save", userCtrl.saveUser);
module.exports = router
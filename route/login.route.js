const express = require('express');
const router = express.Router();
const loginCtrl = require('../controller/login.controller');
const jwtUtil = require('../util/jwtUtil');

router.get("/profile/:userId", jwtUtil.verifyToken(["admin"]), loginCtrl.getUserProfile);
router.post("/signIn", loginCtrl.signIn);
module.exports = router



// try to wirte code of refresh code
//1- using memory in server
//2- using database which is better
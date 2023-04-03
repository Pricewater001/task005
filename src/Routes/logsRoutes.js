/* eslint-disable*/
const express = require("express");
const {
getLogges
} = require("../controllers/loggesControllers");
const { validateJWT } = require("../middlewares/JWTmiddlerware");

const router = express.Router();

router.get("/",validateJWT,getLogges);

module.exports = router;
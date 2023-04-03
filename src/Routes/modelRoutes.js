/* eslint-disable*/
const express = require("express");
const {
  getAllModel,
  getOneModel,
  putModel,
  deleteModel,
  postModel,
} = require("../controllers/modelControllers");
const { validateJWT } = require("../middlewares/JWTmiddlerware");
const { setLogges } = require("../middlewares/Loggesmiddleware");

const router = express.Router();

router.route("/").get(validateJWT,setLogges,getAllModel).post(validateJWT,setLogges,postModel);
router.route("/:id").get(validateJWT,setLogges,getOneModel).put(validateJWT,setLogges,putModel).delete(validateJWT,setLogges,deleteModel);

module.exports = router;

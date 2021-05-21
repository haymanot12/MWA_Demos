var express =require("express");
var router = express.Router();
var controllerGames = require("../controllers/students.controllers.js");
var address= require("../controllers/address.controller.js");


router.route("/students").get(controllerGames.studentGateAll);

//router.route("/games/add").post(controllerGames.gamesAddOne);

router.route("/students/:studentId").get(controllerGames.studentGetOne);

//router.route("/games/:gameId/publisher").get();
//router.route("/games/:gameId/reviews").get(rev.reviewGetAll);

router.route("/students/:studentId/address").get(address.addressGetAll);

router.route("/students/:studentId/address/:addressId").get(address.addressGetOne);

module.exports = router;
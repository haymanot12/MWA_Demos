var express =require("express");
var router = express.Router();
var controllerGames = require("../controllers/students.controllers.js");
var address= require("../controllers/address.controller.js");


router.route("/students").get(controllerGames.studentGateAll).post(controllerGames.studentAddOne);

router.route("/students/:studentId").get(controllerGames.studentGetOne).put(controllerGames.studentUpdateOne).delete(controllerGames.studentDeleteOne);

router.route("/students/:studentId/address").get(address.addressGetAll).post(address.createAddress);
router.route("/students/:studentId/address/:addressId").get(address.addressGetOne).put(address.updateAddress).delete(address.deleteAddress);
;

module.exports = router;
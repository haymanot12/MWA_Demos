var express= require("express");

var router= express.Router();
var controllerGames = require("../api/controller/games.controllers.js");


router.route("/games").get(controllerGames.gamesGetAll);
module.exports = router;

router.route("/games/:gameId").get(controllerGames.gamesGetOne);
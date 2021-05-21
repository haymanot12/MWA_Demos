var express =require("express");
var router = express.Router();
var controllerGames = require("../controllers/games.controllers.js");

router.route("/games").get(controllerGames.gamesGateAll);

//router.route("/games/add").post(controllerGames.gamesAddOne);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);

//router.route("/games/:gameId/publisher").get();
module.exports = router;
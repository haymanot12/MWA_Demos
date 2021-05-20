var express =require("express");
var router = express.Router();
var controllerGames = require("../api/controllers/games.controllers.js");

router.route("/games").get(controllerGames.gamesGateAll).post(function(req,res){
    console.log("POST json route request received");
    res.status(200).json({"jsonData":true});
});


module.exports = router;
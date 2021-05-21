/*module.exports.gamesGetAll=function(req,res){
    console.log("JSON request received");
    res.status(200).json({"jsonDataaaa":true});

};*/
var gamesData= require("../data/games-data.json");
module.exports.gamesGetAll= function(req, res) {
console.log("GET all games");
console.log(req.query);
var offset = 0;
var count = 5;
if (req.query && req.query.offset) {
    offset= parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
    count= parseInt(req.query.count, 10);
    }
    var pageGames= gamesData.slice(offset, offset+count);
    res.status(200).json(pageGames);
//res.status(200).json(gamesData);
}
module.exports.gamesGetOne = function(req,res){
var gameId = req.params.gameId;
var theGame = gamesData[gameId];
console.log("GRT game with gameId",gameId);
res.status(200).json(theGame);
}

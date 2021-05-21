

//var {ObjectId}=require("mongodb")
var mongoose= require("mongoose");
var Game= mongoose.model("Game");


module.exports.gamesGateAll = function(req,res){
  
    var offset= 0;
    var count= 5;
    if (req.query && req.query.offset) {
    offset= parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
    count= parseInt(req.query.count, 10);
    }
    if(count>7)
    {
        count =7;
    }
  
    Game.find().skip(offset).limit(count).exec(function(err, games) {
        console.log("Found games", games.length);
        res.json(games);
        });
    

   
   
};

module.exports.gamesGetOne = function(req,res){

    var gameId = req.params.gameId;
   
    
    Game.findById(gameId).exec(function(err, docs) {

        console.log("Found games", docs);

        res.status(200).json(docs);});
  

}


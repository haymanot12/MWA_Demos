var dbConnection= require("../data/dbconnection.js");

module.exports.gamesGateAll = function(req,res){
    var db = dbConnection.get();
    var collection = db.collection("games");
    var offset= 0;
    var count= 3;
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
    collection.find().skip(offset).limit(count).toArray(function(err, docs) {
    console.log("Found games", docs);
    res.status(200).json(docs);
    });
   
};

 


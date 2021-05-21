var express = require("express");
var path = require("path");
var app = express();
require("./api/data/dbconnection.js").open();
var routes = require("./routes");

app.set("port",3000);

app.use("/api",routes);

var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Listening to port " +port);
});
//test

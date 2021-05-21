const express = require("express");
var app = express();
const path = require("path");
var routes = require("./routes");

app.set("port",5000);

/*
3- Write an express application that returns the result of adding two 
numbers provided by the user. One number is given as a path parameter 
the second number as a queryString.
*/
app.use(function(req,res,next){

    console.log(req.method,req.url);
    next();

});
app.use("/public",express.static(path.join(__dirname,"public")));
app.use("/api",routes);

app.listen(app.get("port"),function(){

    console.log("Listening port "+app.get("port"));

});
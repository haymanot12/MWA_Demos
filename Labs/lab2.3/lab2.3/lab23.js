const express = require("express");
var app = express();
const path = require("path");

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
app.use("/add:num",function(req,res){

    console.log("GET parameters from query string");
    console.log(req.query);
    var num1= parseInt(req.query.num1);
    var num2 = parseInt(req.params.num[1]);
    var sum = num1+num2;

    res.status(200).send("The sum of two numbers is =  " +sum);
});


app.listen(app.get("port"),function(){

    console.log("Listening port "+app.get("port"));

});
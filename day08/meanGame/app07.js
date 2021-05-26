var express = require("express");
require("./api/data/db.js");
var path = require("path");
var app = express();
var routes = require("./api/routes");
const bodyParser = require("body-parser");

app.set("port",3000);

//interceptor logging
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
})

//Serving Static page
app.use(express.static(path.join(__dirname,"public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));

app.use(bodyParser.urlencoded({extended : false}));

app.use("/api", routes);
const server = app.listen(app.get("port"),()=>{
    console.log("Listening to port "+server.address().port);
})


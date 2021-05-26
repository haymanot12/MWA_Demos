require("./api/data/db.js");

const bodyParser = require("body-parser");
const express = require("express");
var path = require("path");
var routes=require("./api/route")


const app = express();
app.set("port",5000);

// interceptor - logging
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
})

// serving static page
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));

//app.use(express.json({extended:false}));
app.use(bodyParser.urlencoded({extended : false}));

app.use("/api",routes);

let server = app.listen(app.get("port"),()=>{
    console.log("Listening port " +server.address().port);
});
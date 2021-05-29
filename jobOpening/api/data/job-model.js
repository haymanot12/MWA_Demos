var mongoose = require("mongoose");

var locationSchema=new mongoose.Schema({
    state:String,
    city:String
});

var jobschema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
      
    },
    salary:{
        type:Number
    },
    location:locationSchema,
    description: { type: String },
    experience:{type: String},
    skills:[],
    postDate:{type:Date}

});
mongoose.model("Job", jobschema);
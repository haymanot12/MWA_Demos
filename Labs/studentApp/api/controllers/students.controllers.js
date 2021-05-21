

//var {ObjectId}=require("mongodb")
var mongoose= require("mongoose");
var Student= mongoose.model("Student");


module.exports.studentGateAll = function(req,res){
  
    var offset= 0;
    var count= 2;
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
  
    Student.find().exec(function(err, student) {
        console.log("Found students", student);
        res.json(student);
        });
    

   
   
};

module.exports.studentGetOne = function(req,res){

    var studentId = req.params.studentId;
   
    
    Student.findById(studentId).exec(function(err, docs) {

        console.log("Found a student", docs);

        res.status(200).json(docs);});
  

}


var mongoose= require("mongoose");
var Student= mongoose.model("Student");

module.exports.addressGetAll = function(req,res){

    var studentId = req.params.studentId;
   
    
    Student.findById(studentId).select("Address").exec(function(err, docs) {

        console.log("Found a student", docs);

        res.status(200).json(docs.Address);});
  

}
module.exports.addressGetOne = function(req,res){

    var studentId = req.params.studentId;
   
    
    Student.findById(studentId).select("Address").exec(function(err, docs) {

        console.log("Found a student", docs);

        res.status(200).json(docs.Address);});
  

}
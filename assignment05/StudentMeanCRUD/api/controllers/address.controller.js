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
module.exports.updateAddress = function(req, resp){
    const id = req.params.studentId;
    Student.findById(id).select("Address").exec(function(err, studentAddress){
        if(err){
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        else{
            console.log(studentAddress);
            studentAddress.Address.state=req.body.state;
            studentAddress.Address.zipcode =req.body.zipcode;
            studentAddress.Address.city = req.body.city;

            studentAddress.save(function(err,savedStudent){
                if(err){
                    console.log("address updated");
                    resp.status(204).json(savedStudent);
                }
                else{
                    resp.status(200).json(savedStudent);
                }
            });
        }
        
    });
};

module.exports.deleteAddress = function(req,resp){
    const id = req.params.studentId;
    Student.findById(id).select("Address").exec(function(err, studentAddress){
        if(err){
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        else{
            studentAddress.Address.remove();
            studentAddress.save(function(err,deletedAddress){
                if(err){
                    console.log("publisher deleted");
                    resp.status(204).json(deletedAddress);
                }
                else{
                    resp.status(200).json(deletedAddress);
                }
            });

        }
    });

}

module.exports.createAddress = function(req,resp){
    const id = req.params.studentId;
    Student.findById(id).exec(function(err, student){
        if(err){
            console.log("error when getting a game");
            resp.status(500).json(err);
        }
        const Address = {state:req.body.state,
             city:req.body.city,
             zipcode:req.body.zipcode
            };

            student.Address =Address;

        console.log(student);
        student.save(function(err, createdAddress){
            if(err){
                console.log("error in saving address");
                resp.status(204).json(createdAddress);
            }
            else{
                resp.status(200).json(createdAddress);
            }
        });
        
    });
}
var mongoose= require("mongoose");

 var addressSchema= new mongoose.Schema({
     state: {
         type: String,
         required: true
     },
     zipcode: {
         type: Number,
         required: true
     },
     city: {
         type: String,
         required: true
     }
     
 });


var studentSchema= new  mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    grade : Number,
    Address:addressSchema
});
mongoose.model("Student", studentSchema, "student");


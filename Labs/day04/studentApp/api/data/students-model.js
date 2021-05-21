var mongoose= require("mongoose");

 var addressSchema= new mongoose.Schema({
     state: {
         type: String,
         required: true
     },
     zipcode: {
         type: Number,
         min: 4,
         max: 5,
         required: true
     },
     city: {
         type: String,
         required: true
     }
     
 });


var studentSchema= mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    grade : Number,
    Address: addressSchema
});
mongoose.model("Student", studentSchema, "student");


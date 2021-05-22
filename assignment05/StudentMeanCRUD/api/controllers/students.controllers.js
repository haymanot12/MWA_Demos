

//var {ObjectId}=require("mongodb")
var mongoose = require("mongoose");
var Student = mongoose.model("Student");


module.exports.studentGateAll = function (req, res) {

    var offset = 0;
    var count = 2;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (count > 7) {
        count = 7;
    }

    Student.find().exec(function (err, student) {
        console.log("Found students", student);
        res.json(student);
    });




};

module.exports.studentGetOne = function (req, res) {

    var studentId = req.params.studentId;


    Student.findById(studentId).exec(function (err, student) {

        console.log("Found a student", student);

        res.status(200).json(student);
    });


}

module.exports.studentAddOne = function (req, res) {

    Student.create({ name: req.body.name, grade: parseFloat(req.body.grade) }, function (err, student) {
        if (err) {
            console.log("Error creating student");
            res.status(400).json(err);
        } else {
            console.log("student created", student);
            res.status(201).json(student);
        }
    });
}



//update a game 
module.exports.studentUpdateOne = function (req, res) {

    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, Student) {
        console.log("error in finding studentttt");
        const response = { status: 204 };
        if (err) {
            console.log("error in finding student");
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        } else if (!Student) {
            console.log("student id not found");
            response.status = 404;
            response.message = { "message": "student ID not found" };
        }
        if (response.status !== 204) {
            console.log("204 is not set");
            res.status(response.status).json(response.message);
        } else {
            Student.name = req.body.name;
            Student.grade = parseFloat(req.body.grade);
            Student.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                else{
                console.log("updated");
                response.status=201;
                response.message={ "message": "student is updated" };
                }
                res.status(response.status).json(response.message);
                
            });
        }
    });
};


module.exports.studentDeleteOne = function (req, res) {

    var studentId = req.params.studentId;
    console.log("DELETE StudentId  ", studentId);

    Student.findByIdAndRemove(studentId).exec(function (err, deletedStudent) {
        var response = { status: 204 };

        if (err) {

            console.log("Error finding Student");
            response.status = 500;
            response.message = err;
        } else if (!deletedStudent) {

            response.status = 404;

            response.message = { "message": "Student ID not found" };
        }

        res.status(response.status).json(response.message);
    });
};


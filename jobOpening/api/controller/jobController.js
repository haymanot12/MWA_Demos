
const { json } = require("express");
var mongoose = require("mongoose");
var Job = mongoose.model("Job");

//get all games
module.exports.jobGetAll = function (req, res) {

    const maxCount = 10;
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    //Limit check
    if (count > maxCount) {
        //count =maxCount;
        res.status(404).json({ "messahe": "the query string count can not exceed " + maxCount });
    }
    //type check for the input query
    if (isNaN(offset) || isNaN(count)) {
        res.status(404).json({ "messahe": "the query string offset and count should be a number" });
    }

    //Job.find().skip(offset).limit(count).exec(function (err, job) {
        Job.find().exec(function(err,job){
        if (err) {
            console.log("error finding games");
            res.status(500).json(err);
        }
        else {
            console.log("Found games", job.length);
            res.status(200).json(job);
        }
    });




};

//get one game
module.exports.JobsGetOne = function (req, res) {

    var jobId = req.params.jobId;


    Job.findById(jobId).exec(function (err, job) {

        console.log("game first section");
        var response = {
            status: 200,
            message: job
        }
        if (err) {//error checking

            console.log("error section");
            response.status = 500;
            response.message = err;


        } else if (!job) {//result checking
            console.log("game section");
            response.status = 404;
            response.message = { "message": "Game Id no found" };
        }
        res.status(response.status).json(response.message);

    });


}
//add one game
module.exports.jobsAddOne = function (req, res) {

    //const loc = req.body.location.split(",");
    console.log("here i am");
    const newJob = {
        title: req.body.title,
        salary: req.body.salary,
        description: req.body.description,
        // skills:req.body.skills,
        experience: req.body.experience,
        postDate: req.body.postDate,
        location:{
            state:req.body.state,
            city:req.body.city
        }, 


    }
    newJob.skills=[];
   newJob.skills.push(req.body.skills);
   
        console.log(newJob);

    Job.create(newJob, function (err, job) {
        if (err) {
            console.log("Error creating job");
            res.status(400).json(err);
        } else {
            console.log("Job created", job);
            res.status(201).json(job);
        }
    });
}



//update a game 
module.exports.jobUpdateOne = function (req, res) {
    const jobId = req.params.jobId;
    if (req.body.title && req.body.salary && req.body.location && req.body.experience  && req.body.postDate && req.body.description) {
        Job.findById(jobId).exec(function (err, job) {//&& req.body.skill
            const response = { status: 204 };
            if (err) {
                console.log("Error finding game");
                response.status = 500;
                response.message = err;
            } else if (!jobId) {
                response.status = 404;
                response.message = { "message": "Job ID not found" };
            }
            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                //const loc = req.body.location.split(",");
                job.title = req.body.title;
                job.salary = req.body.salary;
                job.description = req.body.description;
                job.experience = req.body.experience;
               job.skills=[];
                job.skills.push(req.body.skills);
                job.postDate = req.body.postDate;
                job.location.state = req.body.location.state;
                job.location.city = req.body.location.city;

                job.save(function (err, updatedGame) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                });
            }
        });
    }
    res.status(404).json({ "message": "you have to fill all element" });
};


module.exports.jobDeleteOne = function (req, res) {

    var jobId = req.params.jobId;
    console.log("DELETE gameId ", jobId);

    Job.findByIdAndRemove(jobId).exec(function (err, deletedGame) {
        var response = { status: 204 };

        if (err) {

            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {

            response.status = 404;

            response.message = { "message": "Game ID not found" };
        }

        res.status(response.status).json(response.message);
    });
};


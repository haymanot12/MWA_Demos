
const { json } = require("express");
var mongoose = require("mongoose");
var Job = mongoose.model("Job");

//get all games
module.exports.jobLocationGetAll = function (req, res) {
    let jobId= req.params.jobId;
    Job.findById(jobId).select("location").exec(function (err, job) {
        if (err) {
            console.log("error finding games");
            res.status(500).json(err);
        }
        else {
            console.log("Found games", job.length);
            res.status(200).json(job.location);
        }
    });




};

//get one game
module.exports.JobsLocationGetOne = function (req, res) {

    var jobId = req.params.jobId;


    Job.findById(jobId).exec(function (err, job) {

        console.log("game first section");
        var response = {
            status: 200,
            message: job.location
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
module.exports.jobLocationAddOne = function (req, res) {

    let id = req.params.jobId;

    let response = {
        status: 201,
        message: ""
    }

    if(req.body.city && req.body.state){
        console.log(id);

        Job.findById(id).exec(function(err, job){
            if(err){
                response.status = 500;
                response.message = err;
                res.status(response.status).json(response.message);
                return;
            }else if(!job) {
                response.status = 404;
                response.message = "Job  not Found.";
                res.status(response.status).json(response.message);
                return;
            }else {
                if(!job.location){
                    job.location = new Object();
                }
                job.location = {
                    city: req.body.city,
                    state: req.body.state,
                }
                job.save(function(err, updatedJob){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }else {
                        response.status = 201;
                        response.message = updatedJob;
                    }

                    res.status(response.status).json(response.message);
                    return;

                });
            }    
            
        })

    }else {
        response.status = 400;
        response.message = "Required field is missing";
        res.status(response.status).json(response.message);
        return;
    }
}



//update a game 
module.exports.jobLocationUpdateOne = function (req, res) {
    const jobId = req.params.jobId;

    if (req.body.state && req.body.city) {

        Job.findById(jobId).select("location").exec(function (err, job) {
            const response = { status: 204,message:"" };
            if (err) {
                console.log("Error finding Job");
                response.status = 500;
                response.message = err;
            } else if (!job) {
                response.status = 404;
                response.message = { "message": "Job ID not found" };
            }
            if (response.status !== 204) {
                res.status(response.status).json(response.message);
            } else {
                //const loc = req.body.location.split(",");
                job.location.state = req.body.state;
                job.location.city = req.body.city;

                job.save(function (err, updatedGame) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                   
                });
            }
            res.status(response.status).json(response.message);

        });
        
    }else{
    res.status(404).json({ "message": "you have to fill all element" });
    }
};


module.exports.jobLocationDeleteOne = function (req, res) {

    const jobId = req.params.jobId;

    JobOpening.findById(jobId).exec(function(err, job){

        let response = {
            status: 204,
            message : ""
        }

        if(err){
            response.status = 500;
            response.message = err;
        }else if(!job){
            response.status = 404;
            response.message = {message : "Job Opening not found"};
        }else {
            job.location.remove();
            job.save(function(err, jobb){
                if(err){
                    response.status = 500;
                    response.message = err;
                }else{
                    response.status = 201;
                    response.message = "";
                }
                res.status(response.status).json(jobb)

            
            })
        }
        res.status(response.status).json(response.message)
    })
};


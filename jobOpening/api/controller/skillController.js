
const { json } = require("express");
var mongoose = require("mongoose");
var Job = mongoose.model("Job");

module.exports.jobSkillGetAll = function (req, res) {

    let jobId = req.params.jobId;
    Job.findById(jobId).select("skills").exec(function (err, job) {
        if (err) {
            console.log("error finding Job");
            res.status(500).json(err);
        }
        else {
            console.log("Found games", job.length);
            res.status(200).json(job.skills);
        }
    });
};
//get one game
module.exports.JobsSkillGetOne = function (req, res) {
    console.log("inside the request ");

    Job.findById(req.params.jobId).select("skills").exec(function(err, job){
        let response = {
            status: 200,
            message: ""
        }
        console.log("0:skill lfound");
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!job){
            response.status = 404;
            response.message = {message: "Job not found"};
        }else {
            console.log("3 skill found");
            let skill = job.skills.id(req.params.skillId);
            if(skill){
                console.log("2 skill found");
                response.status = 200;
                response.message = job.skills.id(req.params.skillId);
            }else {
                console.log("1 skill found");
                response.status = 404;
                response.message = {message : "Skill not found"};
            }
        }

        res.status(response.status).json(response.message);

    });


}
//add one game
module.exports.jobSkillAddOne = function (req, res) {
    let response = {
        status: 200,
        message: ""
    }
    if(req.body.skill){

        Job.findById(req.params.jobId).exec(function(err, job){
            if(err){
                response.status = 500;
                response.message = err; 
                res.status(response.status).json(response.message);
                return;
            }else if(!job){
                response.status = 404;
                response.message =  {message : "Skill not found"};;
                res.status(response.status).json(response.message);
                return;
            }else {
                let newskill = {
                    skill: req.body.skill
                };
                if(!job.skills){
                    job.skills = new ArrayList();
                }
                job.skills.push(newskill)
                job.save(function(err, job){
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }else {
                        response.status = 201;
                        response.message = job;
                    }
                    res.status(response.status).json(response.message);
                    return;
                });
            }
        })

    }else {
        response.status = 400;
        response.message = {message : "Required Fields are Missing."};
        res.status(response.status).json(response.message);
        return;
    }


}

//update a game 
module.exports.jobSkillUpdateOne = function (req, res) {
    let response = {
        status: 200,
        message: ""
    }
    if( req.body.skill){

        Job.findById(req.params.jobId).exec(function(err, job){
            if(err){
                response.status = 500;
                response.message = err; 
                res.status(response.status).json(response.message);
                return;
            }else if(!job){
                response.status = 404;
                response.message =  {message : "Job Opening not found"};;
                res.status(response.status).json(response.message);
                return;
            }else {

                var skl = job.skills.id(req.params.skillId);
                if(skl){
                    var indx = job.skills.indexOf(skl);
            
                    job.skills[indx].skill = req.body.skill; 
    
                    job.save(function(err, job){
                        if(err){
                            response.status = 500;
                            response.message = err;
                        }else {
                            response.status = 201;
                            response.message = job;
                        }
                        res.status(response.status).json(response.message);
                        return;
                    });
                }else {
                    response.status = 404;
                    response.message =  {message : "Skill not found"};;
                    res.status(response.status).json(response.message);
                    return;
                }
                
            }
        })

    }else {
        response.status = 400;
        response.message = {message : "Required Fields are Missing."};
        res.status(response.status).json(response.message);
        return;
    }

};


module.exports.jobSkillDeleteOne = function (req, res) {

    let jobId = req.params.jobId;
    let skillId =req.params.skillId;

    let response = {
        status: 200,
        message: ""
    }

    Job.findById(jobId).select("skills").exec(function(err, job){
        if(err){
            response.status = 500;
            response.message =  err
            res.status(response.status).json(response.message);
            return;
        }else if(!job){
            response.status = 404;
            response.message =  {message : "Job Opening not found"};
            res.status(response.status).json(response.message);
            return;
        }else {
            var skill = job.skills.id(skillId);

            if(skill){
                let index = job.skills.indexOf(skill);
                job.skills.splice(index, 1);
                job.save(function(err, job){
                    if(err){
                        response.status = 500;
                        response.message =  err
                        res.status(response.status).json(response.message);
                        return;
                    }else {
                        response.status = 204;
                        response.message =  job;
                        res.status(response.status).json(response.message);
                        return;
                    }
                })

            }else {
                response.status = 404;
                response.message =  {message : "Skill not found"};
                res.status(response.status).json(response.message);
                return;
            }
            
        }
    })

};


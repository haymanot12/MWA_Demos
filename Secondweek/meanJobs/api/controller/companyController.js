require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Jobs = mongoose.model("Jobs");


module.exports.getAllCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, company) => {

        if (err) {

            console.log("Error in finding company");
            res.status(500).json(err);

        } else {
            res.status(200).json(company.company);
        }
    });

}
module.exports.getOneCompany = (req, res) => {

    const jobId = req.params.jobId;
    const cId = req.params.cId;

    Jobs.findById(jobId).select("company").exec((err, job) => {

        if (err) {
            res.status(500).json(err);

        } else if (!job) {

            res.status(404).json({ "message": "can't find a Job with this Id" });

        }
        else {

            let company = job.company.id(cId);
            res.status(200).json(company);
        }
    });
}

module.exports.addCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        if (err) {
           
            res.status(500).json(err);
        }
        if (req.body.companyName) {

            const company = { companyName: req.body.companyName };
          
            job.company.push(company);
            console.log(job.company);

            job.save((err, newCompany) => {
               
                if (err) {
                    console.log(newCompany);
                    res.status(500).json(err);
                } else {
                  
                    res.status(200).json(newCompany);
                }
            });
        }
        else {

            res.status(400).json({ "Message": "Company Name must be filled" });
        }
    });
}


module.exports.updateCompany = (req, res) => {

    const jobId = req.params.jobId;
    const cId = req.params.cId;

    Jobs.findById(jobId).select("company").exec((err, job) => {

        const response = { status: 204 };
        if (err) {
            res.status(500).json(err);

        } else if (!job) {

            res.status(404).json({ "Message": "Job with given JobId not found" });

        } else {

            let cIndex = job.company.indexOf(job.company.id(cId));
            job.company[cIndex].companyName = req.body.companyName;

            if(cIndex===-1){

                res.status(404).json({"Message":" The specfied Id is not found"});
            }

            job.save((err, updatedcompany) => {
                if (err) {
                    res.status(500).json(err);
                }
                else {

                    res.status(response.status).json({ "Message": "Company Updated Successfully" });
                }
            });
        }
    });
}

module.exports.deleteCompany = (req, res) => {

    const jobId = req.params.jobId;
    const cId = req.params.cId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        const response = { status: 204 };
        if (err) {
            res.status(500).json(err);

        } else if (!job) {
            res.status(404).json({ "Message": "can't find a job with this Id" });

        } else {

            let cIndex = job.company.indexOf(job.company.id(cId));
            const company = job.company[cIndex];
            if(cIndex===-1){
                res.status(404).json({"Message":" the specfied Id if not found"});
            }
            if (company) {
                job.company.splice(cIndex, 1);
                job.save((err, deletedCompany) => {
                    if (err) {
                        res.status(500).json({ "message": "Cannot be deleted" })
                    } else {
                        res.status(response.status).json({ "message": "The specified Company Deleted Successfully" });
                    }
                })
            }
            else {
                res.status(404).json({ "Message": "cannot found the company Id" });
            }
        }
    });

}









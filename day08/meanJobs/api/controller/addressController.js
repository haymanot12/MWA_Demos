require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Jobs = mongoose.model("Jobs");

module.exports.getAddress = (req, res) => {
    const jobId = req.params.jobId;
    const cId = req.params.cId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        if (err) {
            res.status(500).json(err);
        } else {

            let compan = job.company.id(cId);

            res.status(200).json(compan.Address);
        }
    });
}
module.exports.getOneAddress = (req, res) => {

    const jobId = req.params.jobId;
    const cId = req.params.cId;
    const addressId = req.params.addressId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        if (err) {

            res.status(404).json(err);

        } else if (!job) {

            res.status(404).json({ "message": "can't find a job with this Id" });
        }
        else {

            let company = job.company.id(cId);
            let address = company.Address.id(addressId);
            res.status(200).json(address);
        }
    });
}

module.exports.addAddress = (req, res) => {

    const jobId = req.params.jobId;
    const cId = req.params.cId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        if (err) {
            res.status(500).json(err);
        } else if (!job) {

            res.status(404).json({ "Message": "cannot find Job with the given JobId" });
        } else {

            const address = { "state": req.body.state, city: req.body.city };
            const cIndex = job.company.indexOf(job.company.id(cId))

            job.company[cIndex].Address.push(address);

            job.save((err, newAddress) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(newAddress);
                }
            });
        }
    });
}

module.exports.updateAddress = (req, res) => {

    const jobId = req.params.jobId;
    const cId = req.params.cId;
    const addressId = req.params.addressId;

    Jobs.findById(jobId).select("company").exec((err, job) => {

        const response = { status: 204 };
        if (err) {

            response.status = 500;

            console.log("cannot find JobId");
            res.status(404).json(err);

        } else {


            const cIndex = job.company.indexOf(job.company.id(cId));
            const aIndex = job.company[cIndex].Address.indexOf(job.company[cIndex].Address.id(addressId));
            if(aIndex==-1){
                res.status(404).json({"Message":" can not found address Id"});
            }
            job.company[cIndex].Address[aIndex].state = req.body.state;
            job.company[cIndex].Address[aIndex].city = req.body.city;
            

            job.save((err, updatedAddress) => {
                if (err) {
                    res.status(500).json(err);
                }
                else {

                    res.status(response.status).json({ "message": "Company Updated Successfully" });
                }
            });
        }
    });
}



module.exports.deleteAddress = (req, res) => {

    const jobId = req.params.jobId;
    const cId = req.params.cId;
    const addressId = req.params.addressId;

    Jobs.findById(jobId).select("company").exec((err, job) => {

        const response = { status: 204 };

        if (err) {

            response.status = 500;

            console.log("cannot find a company");
            res.status(404).json(err);

        } else if (!job) {

            res.status(404).json({ "Message": "Job with specified Id is not found" });

        } else {

            const cIndex = job.company.indexOf(job.company.id(cId));
            const aIndex = job.company[cIndex].Address.indexOf(job.company[cIndex].Address.id(addressId));
            const address = job.company[cIndex].Address[aIndex];

            if(aIndex==-1){
                res.status(404).json({"Message":" can not found address Id"});
            }

            if (address) {
                job.company[cIndex].Address.splice(aIndex, 1);
                job.save((err, deletedCompany) => {
                    if (err) {
                        res.status(500).json({ "message": "Can not be deleted" })
                    } else {
                        res.status(response.status).json({ "message": "Address Deleted Successfully" });
                    }
                })
            }
            else{
                res.status(404).json({"Message":"the specefied address Id is not found"});
            }
        }
    });
}









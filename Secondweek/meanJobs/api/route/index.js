const express=require("express");
let router = express.Router();

let jobsController = require("../controller/jobsController");
let companyController = require("../controller/companyController");
let addressController = require("../controller/addressController");
let userController = require("../controller/user-controller");

router.route("/jobs")
.get(jobsController.getAllJobs)
.post(jobsController.addOneJob)
.patch(jobsController.jobSearch);

router.route("/jobs/:jobId")
.get(jobsController.getOneJob)
.put(jobsController.updateJob)
.delete(jobsController.deleteJob);

router.route("/jobs/:jobId/company")
.get(companyController.getAllCompany)
.post(companyController.addCompany);

router.route("/jobs/:jobId/company/:cId")
.get(companyController.getOneCompany)
.put(companyController.updateCompany)
.delete(companyController.deleteCompany);

router.route("/jobs/:jobId/company/:cId/address")
.get(addressController.getAddress)
.post(addressController.addAddress);
router.route("/jobs/:jobId/company/:cId/address/:addressId")
.get(addressController.getOneAddress)
.put(addressController.updateAddress)
.delete(addressController.deleteAddress);

router.route("/users/register").post(userController.register);
router.route("/users/login").post(userController.login);

module.exports=router;
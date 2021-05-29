var express =require("express");
var router = express.Router();
var controllerJob = require("../controller/jobController.js");
var locationController = require("../controller/locationController.js");
var skillController = require("../controller/skillController.js");

router.route("/jobs").get(controllerJob.jobGetAll).post(controllerJob.jobsAddOne);;
router.route("/jobs/:jobId").get(controllerJob.JobsGetOne)
.put(controllerJob.jobUpdateOne)
.delete(controllerJob.jobDeleteOne);

router.route("/jobs/:jobId/location").get(locationController.jobLocationGetAll)
.post(locationController.jobLocationAddOne)

router.route("/jobs/:jobId/location/:locId").get(locationController.JobsLocationGetOne)
.put(locationController.jobLocationUpdateOne)
.delete(locationController.jobLocationDeleteOne);

router.route("/jobs/:jobId/skills/")
    .get(skillController.jobSkillGetAll)
    .post(skillController.jobSkillAddOne);

router.route("/jobs/:jobId/skills/:skillId")
    .get(skillController.JobsSkillGetOne)
    .put(skillController.jobSkillUpdateOne)
    .delete(skillController.jobSkillDeleteOne)



module.exports = router;
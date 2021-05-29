angular.module("meanJobs").controller("JobsController", JobsController);

function JobsController(JobDataFactory) {
    var vm = this;
    vm.title = "MEAN JobOpening App";
    vm.isSubmitted = false;
    vm.saveOrEdit = "save";

    JobDataFactory.getAllJobs()
        .then(function (response) {
            vm.jobs = response;
        });

    vm.addJob = function () {
        vm.success = false;
        console.log("inside add Job");
        var postData = {
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            skills: vm.newJobSkill,
            experience: vm.newJobSExperience,
            description: vm.newJobDescription,
            postDate: vm.newJobpostDate,
            state: vm.newJobLocationx,
            city: vm.newJobLocationy
        
        };
        console.log(postData);
        /*postData.skills.push(req.body.skills);
    console.log(postData.skills);*/
        
        if (vm.saveOrEdit === "save") {
            console.log(postData);

            if (vm.jobForm.$valid) {
                JobDataFactory.addOneJobs(postData).then(function (response) {
                    console.log(response);
                    vm.success = true;

                   // $location.path("/");
                             
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                vm.isSubmitted = true;
                console.log("Data Validation FAiled")
            }
        }
    }
}
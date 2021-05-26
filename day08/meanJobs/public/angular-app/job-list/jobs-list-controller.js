angular.module("meanJobs").controller("JobsController", JobsController);

function JobsController(JobDataFactory){
    var vm = this;
    vm.title = "MEAN Jobs App";

    JobDataFactory.getAllJobs()
        .then(function(response){
            vm.jobs = response;
        });
}
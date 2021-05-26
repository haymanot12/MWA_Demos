angular.module("meanJobs").controller("JobController", JobController);


function JobController($routeParams, JobDataFactory){
    var vm = this;
    vm.title = "MEAN Jobs App";

    var id = $routeParams.id;
    vm.idd = id;

    JobDataFactory.getOneJob(id)
        .then(function(response){
            vm.job = response;
         
    });
}
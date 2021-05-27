angular.module("meanJobs").controller("JobController", JobController);


function JobController($routeParams, JobDataFactory){
    var vm = this;
    vm.title = "MEAN Jobs App";

    var id = $routeParams.id;
    vm.idd = id;

    JobDataFactory.getOneJob(id)
        .then(function(response){
            vm.job = response;
            console.log(response)
         
    });
    vm.deleteSuccess = null;
    vm.deleteJob = function(jobId){
        if(jobId){
            console.log(jobId);
            JobDataFactory.deleteOneJob(jobId).then(function(response){
                console.log(response)
                vm.deleteSuccess = true;

            }).catch(function(error){
                console.log(error);
            });
        }
    }
}
angular.module("meanJobs").controller("JobController", JobController);


function JobController($routeParams, JobDataFactory, AuthFactory) {
    var vm = this;
    vm.title = "MEAN Jobs App";
    vm.show="edit";

    var id = $routeParams.id;

    JobDataFactory.getOneJob(id)
        .then(function (response) {
            vm.job = response;
            console.log(response)

        });
    vm.isLoggedIn = function () {
        // console.log(AuthFactory.auth.isLoggedIn);
        if (AuthFactory.auth.isLoggedIn) {
            return true;
        }
        return false;
    };


    vm.editJob=function(){
        vm.show="update";
        vm.newJobTitle=vm.job.jobTitle;
        vm.newJobSalary=vm.job.salary;
        vm.newJobDescription = vm.job.description
        
    }
    vm.editSuccess = null;
    vm.updateJob=function(){
       
        const newjob={
            jobTitle:vm.newJobTitle,
            salary:vm.newJobSalary,
            description:vm.newJobDescription
           
        }
        JobDataFactory.editOneJob(id,newjob)
        .then(function(response){
            vm.job = response;
            vm.show="edit";
         
    }).catch(function (error) {
        console.log(error);
    });


    }

 

    vm.deleteSuccess = null;
    vm.deleteJob = function (jobId) {
        if (jobId) {
            console.log(jobId);
            JobDataFactory.deleteOneJob(jobId).then(function (response) {
                console.log(response)
                vm.deleteSuccess = true;

            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}
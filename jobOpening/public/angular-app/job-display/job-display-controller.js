angular.module("meanJobs").controller("JobController", JobController);

function _getStarRating(stars){
    return new Array(stars);
}
function JobController($routeParams, JobDataFactory){
    var vm = this;
    vm.title = "MEAN Jobs App";

    var id = $routeParams.id;

    JobDataFactory.getOneJobs(id)
        .then(function(response){
            vm.job = response;
            vm.rating = _getStarRating(response.rate);
         
    });


    ////////////////////////////////////////////////////////////////////

    vm.editJob=function(){

                 vm.newJobTitle= vm.job.title,
                vm.newJobSalary=vm.job.salary,
                 vm.newJobSExperience= vm.job.experience,
                 vm.newJobDescription=vm.job.description,
                 vm.newJobpostDate= vm.job.postDate,
                vm.newJobLocationx= vm.job.location.state,
                 vm.newJobLocationy=vm.job.location.city,
                 vm.newJobSkill=vm.job.skills
                }

        vm.update = false;
    vm.updateOneJob=function(){
        const newJob={
            title: vm.newJobTitle,
            salary:vm.newJobSalary,
            experience:vm.newJobSExperience,
            description :vm.newJobDescription,
            postDate:vm.newJobpostDate,
            state:vm.newJobLocationx,
            city: vm.newJobLocationy,
            skills:vm.newJobSkill
        }
        JobDataFactory.updateOneJob(id,newJob)
        .then(function(response){
            vm.update = true;
            vm.job = response;
            
         
    });
}


    

    ///////////////////////////////////////////////////////////////////

    

    
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
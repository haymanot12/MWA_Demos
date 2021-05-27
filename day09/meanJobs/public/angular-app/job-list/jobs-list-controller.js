angular.module("meanJobs").controller("JobsController", JobsController);

function JobsController(JobDataFactory){
    var vm = this;
    vm.title = "MEAN Jobs App";

    JobDataFactory.getAllJobs()
        .then(function(response){
            vm.jobs = response;
        });

        vm.addJob = function(){
 
            var postData = {
                jobTitle: vm.newJobTitle,
                description: vm.newJobDescription,
                salary : vm.newJobSalary,
                company:{companyName:vm.newJobCompany,
                    Address:{
                        state:vm.newJobstate,
                        city:vm.newJobcity
                    }
                }

                
            };
    
            if(vm.jobForm.$valid){
                JobDataFactory.addOneJob(postData).then(function(response){
                    console.log("Job Saved");
                    vm.isSaved=true;
                }).catch(function(error){
                    console.log(error);
                })
            }else {
                vm.isSubmitted = true;
                console.log("Data Validation FAiled")
            }
        }


}
angular.module("meanJobs").controller("RegisterController", RegisterController);
function RegisterController(JobDataFactory) {
    var vm = this;
    vm.register = function () {
        var user = { 
            username: vm.username, 
            pasword: vm.password
         };
        if (!vm.username || !vm.password) { 
            vm.err = "Please add a username and password."; 
            vm.message="";
        }else {
            if (vm.password !== vm.passwordRepeate) {
                vm.err = "Please make sure the passwords match.";
                vm.message="";
            } else {
                JobDataFactory.registerUser(user).then(function(result){
                    console.log(result);
                    console.log("success");
                    vm.message="Successful registration, please login.";
                    vm.err="";
                }).catch(function(err){
                    console.log(err);
                })
            }
        }
    }
};

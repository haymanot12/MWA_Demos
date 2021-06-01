angular.module("meanJobs").controller("LoginController", LoginController);

//////////////////////////////////////////
function LoginController($http, $location, $window, AuthFactory, JobDataFactory, jwtHelper){

    var vm = this;
    

    vm.isLoggedIn = function(){
        if(AuthFactory.auth.isLoggedIn){
            return true;
        }
        return false;
    }

    vm.register = function(){
        var user = {
            username: vm.username,
            password: vm.password,
        }
    
        if(!vm.username || !vm.password){
            vm.message = "";
            vm.err = "Please ass a username and password"; 
        }else {
            if(vm.password !== vm.passwordRepeate){
                vm.err = ""
            }else {
                $http.post("/api/users/login", user).then(function(result){
                    vm.message = "sucessful logged in";
                    vm.err = "";
                }).catch(function(err){
    
                });
            }
        }
    }

    vm.login = function(){
        if(vm.username && vm.password){
            var user = {
                username : vm.username,
                password: vm.password
            };

            JobDataFactory.login(user).then(function(response){
            
                if(response&&response.success){
                    $window.sessionStorage.token = response.token;
                    AuthFactory.auth.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                  // $location.path("/");
                  //Read the payload of the token
                     var decodedToken = jwtHelper.decodeToken(token);
                     vm.loggedInUser = decodedToken.name;
                     console.log(vm.loggedInUser);
                     console.log(decodedToken);
                    
                   
                     vm.username="";
                     vm.password="";
                
            }
            
            }).catch(function(err){
                console.log(err);
            });
        }
    }

    vm.logout = function(){
       
        
        AuthFactory.auth.isLoggedIn= false;
            delete $window.sessionStorage.token;
            $location.path("/");

        
        
    }

    vm.isActiveTab = function(url){
        var currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }
    
}



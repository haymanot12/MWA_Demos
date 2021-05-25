angular.module("myProperApp").controller("activityController", activityController);

function activityController($http){
    
    var vm = this;
    
    $http.get("https://www.boredapi.com/api/activity")
        .then(function(response){
            vm.activity = response.data;
        })

}
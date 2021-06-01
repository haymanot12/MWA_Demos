angular.module("meanJobs").directive("jobsNavigation", jobsNavigation);

function jobsNavigation(){
    return{
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}
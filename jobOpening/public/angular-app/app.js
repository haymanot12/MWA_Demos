// is going to hold application module and route
angular.module("meanJobs", ["ngRoute"]).config(config);

function config($routeProvider){
    // $locationProvider.hashPrefix("");
    $routeProvider
    .when("/", {
        templateUrl: "angular-app/job-list/jobs.html",
        controller : "JobsController",
        controllerAs: "vm"
    })
    .when("/jobs/:id", {
        templateUrl: "angular-app/job-display/job.html",
        controller : "JobController",
        controllerAs: "vm"
    })
}
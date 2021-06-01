// is going to hold application module and route
angular.module("meanJobs", ["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider, $routeProvider, $locationProvider) {
    // $locationProvider.hashPrefix("");
    $routeProvider
        .when("/", {
            templateUrl: "angular-app/welcome/welcome.html",
            access: { restricted: false }
        })
        .when("/jobs", {
            templateUrl: "angular-app/job-list/jobs.html",
            controller: "JobsController",
            controllerAs: "vm",
            access: { restricted: false }
        })
        .when("/job/:id", {
            templateUrl: "angular-app/job-display/job.html",
            controller: "JobController",
            controllerAs: "vm",
            access: { restricted: false }
        })
        .when("/register", {
            templateUrl: "angular-app/register/register.html",
            controller: "RegisterController",
            controllerAs: "vm",
            access: { restricted: false }
        })
        .when("/login",{
            templateUrl:"angular-app/login/login.html",
            controller: "LoginController",
            controllerAs:"vm"
    
        })
        .when("/profile", {
            templateUrl: "angular-app/profile/profile.html",
            controllerAs: "vm",
            access: { restricted: true }
        })

        .otherwise({ 
            redirectTo: "/"
         });

}

function run($rootScope, $location, $window, AuthFactory) {

//  if(AuthFactory.auth.isLoggedIn){
//                 $location.path("/jobs");

//             }
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token &&
            !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root
            $window.location.reload();
            }
        });
          
}
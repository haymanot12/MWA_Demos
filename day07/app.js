

angular.module("myProperApp",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : "template/main.html",
            controller : "MainController",
            controllerAs : "mainCtrl"
        })
        .when("/about", {
            templateUrl : "template/about.html",
            controller : "AboutController",
            controllerAs : "aboutCtrl"
        })
        .when("/joke", {
            templateUrl : "template/joke.html",
            controller : "JokeController",
            controllerAs : "jokeCtrl"
        })
        .when("/fact", {
            templateUrl : "template/activity.html",
            controller : "activityController",
            controllerAs : "actCtr"
        })
        .otherwise({
            redirectTo: "/"
        })
}
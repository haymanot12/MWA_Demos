angular.module("meanJobs").directive("gameRating",GameRating);

function GameRating(){
    return{
        //E element A attribute
        restrict:"E",
        templateUrl:"angular-app/game-rating-directive/rating.html",
        bindToController:true,
        controller:"JobController",
        controllerAs:"vm",
        // scope:{
        //     stars:"@"
        // }
    }
}
angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory){
    var vm = this;
    vm.title = "MEAN Games App";
    vm.isSubmitted = false;

    GameDataFactory.getAllGames()
        .then(function(response){
            vm.games = response;
        });

        vm.addGame = function(){
            console.log("inside add game");
            var postData = {
                title: vm.newGameTitle,
                price: vm.newGamePrice,
                rate: vm.newGameRating,
                players: vm.newGameMinPlayers,
                designers: vm.newGameDesigner
            };
            if(vm.gameForm.$valid){
                GameDataFactory.addOneGame(postData).then(function(response){
                    console.log("Game Saved");
                }).catch(function(error){
                    console.log("here is the error");
                    console.log(error);
                })
            }else {
                vm.isSubmitted = true;
                console.log("Data Validation FAiled")
            }
        }
}
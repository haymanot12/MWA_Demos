import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';

export class Game {
  // always needs an initializer value, or needs to be disabled from ts value
  // ! ignores the initializer value
  _id!: number;
  title!: string;
  price!: number;
 rate!:number
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  title: string = 'Mean Games';
  // game1: Game = {
  //   _id: 123,
  //   title: "Game One",
  //   price: 10.99
  // }
  // game2: Game = {
  //   _id: 124,
  //   title: "Game Two",
  //   price: 12.99
  // }

  games: Game[] = [];

  constructor(private gamesDataService: GamesDataService) {}
  newGame = new Game();

  ngOnInit(): void {
    this.getGames();
  }

  private getGames(): void {
    this.gamesDataService
      .getGames()
      // .then((response) => this.gotGames(this, response)) //alt
      .then((response) => this.gotGames(response))

      .catch(this.handleError);
  }

  private gotGames(response: Game[]) {
    // private gotGames(gamesListComponent: GamesListComponent, response: Game[]) { //alt
    console.log(response);
    this.games = response; //alt and basic
    // gamesListComponent.games = response; //alt
  }

  private handleError(error: any) {
    console.log(error);
  }



  ///////////////////////////////////

  addGame(data:Game) {
    //this.gamesDataService.addGame(this.newGame);//.then((response) => this.gotGames(response))
    console.log(data);
     // .catch(this.handleError);
     this.gamesDataService.addGame(data);//.then().catch()
  }
}

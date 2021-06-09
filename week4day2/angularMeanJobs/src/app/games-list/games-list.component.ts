import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';

export class Job {
  // always needs an initializer value, or needs to be disabled from ts value
  // ! ignores the initializer value
   _id!: number;
  jobTitle!: string;
  description!:string;
  salary!:number;


 
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  title: string = 'Mean Jobs';


  jobs: Job[] = [];

  constructor(private gamesDataService: GamesDataService) {}

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

  private gotGames(response: Job[]) {
    // private gotGames(gamesListComponent: GamesListComponent, response: Game[]) { //alt
    console.log(response);
    this.jobs = response; //alt and basic
    // gamesListComponent.games = response; //alt
  }

  private handleError(error: any) {
    console.log(error);
  }

  addJob(data:Job) {
    //this.gamesDataService.addGame(this.newGame);//.then((response) => this.gotGames(response))
    console.log(data);
     // .catch(this.handleError);
     this.gamesDataService.addJob(data);//.then().catch()
  }
}

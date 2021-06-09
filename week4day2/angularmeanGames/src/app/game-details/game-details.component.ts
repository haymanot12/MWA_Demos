import { Component, OnInit } from '@angular/core';
import{ ActivatedRoute } from '@angular/router';


import { GamesDataService } from '../games-data.service';
import { Game } from "../games-list/games-list.component";


@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})


export class GameDetailsComponent implements OnInit {
  game: Game= {} as Game;
   gameId:String='';
  constructor(private gamesDataService:GamesDataService, private route:ActivatedRoute) {}

  ngOnInit(): void {

    const gameId: string = this.route.snapshot.params.gameId;
    this.getOneGame(gameId);
    this.deleteOneGame();

  }
  private getOneGame(gameId: string):void{
    this.gamesDataService.getOneGame(gameId).then((response)=>this.gotOneGame(response))
    .catch(this.handleOneError)
  }

    private gotOneGame(response:any) {
      console.log("Getting one Game");
    console.log(response);
    this.game= response;
  }

  private handleOneError(error: any) {
    console.log(error);
  }
  ///////////////////////////////////////////
  public deleteOneGame():void{
    this.gamesDataService.deleteOneGame(this.gameId).then((response)=>this.gotOneGame(response))
   
  }
  ///////////////////update///////////////////////

  public updateGame(data:Game):void{
    this.gamesDataService.updateGame(data,this.gameId).then((response)=>this.gotOneGame(response))
   
  }
}

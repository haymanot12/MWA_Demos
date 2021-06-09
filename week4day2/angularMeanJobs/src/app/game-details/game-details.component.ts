import { Component, OnInit } from '@angular/core';
import{ ActivatedRoute } from '@angular/router';


import { GamesDataService } from '../games-data.service';
import { Job } from "../games-list/games-list.component";


@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})


export class GameDetailsComponent implements OnInit {
  job: Job= {} as Job;
  jobId:string='';
  constructor(private gamesDataService:GamesDataService, private route:ActivatedRoute) {}

  ngOnInit(): void {

    const jobId: string = this.route.snapshot.params.jobId;
    this.getOneGame(jobId);

  }
  private getOneGame(jobId: string):void{
    this.gamesDataService.getOneGame(jobId).then((response)=>this.gotOneGame(response))
    .catch(this.handleOneError)
  }

    private gotOneGame(response:any) {
      console.log("Getting one Job");
    console.log(response);
    this.job= response;
  }

  private handleOneError(error: any) {
    console.log(error);
  }


    ///////////////////////////////////////////
    public deleteOneJob():void{
      this.gamesDataService.deleteOneJob(this.jobId).then((response)=>this.gotOneGame(response))
     
    }
    ///////////////////update///////////////////////
  
    public updateJob(data:Job):void{
      this.gamesDataService.updateJob(data,this.jobId).then((response)=>this.gotOneGame(response))
     
    }
}

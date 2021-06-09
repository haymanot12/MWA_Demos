// first system dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// second application dependencies
import { Job } from './games-list/games-list.component';

// third declarations
@Injectable({
  providedIn: 'root'
})

// fourth exports
export class GamesDataService {
private baseURL: string = "http://localhost:5000/api";

  constructor(private http: HttpClient) { } 
  public getGames(): Promise<Job[]>{
    // 1. Build URL
    const url: string = this.baseURL + "/jobs";

    
    return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleError);
  }

  private gotGames(response: any){ // can add :Game[] to the end of (response: any)
    return response as Job[];
  }

  private handleError(error: any){ // can add :Game[] to the end of (error: any)
    console.log("Error", error);
    return [];
  }

  public getOneGame(jobId: any): Promise<Job>{
    const url: string= this.baseURL + "/jobs/" +jobId;

    return this.http.get(url).toPromise().then( response=> this.gotOneGame(response)).catch(this.handleOneError);
  }

private gotOneGame(response: any):Job{
  return response as Job;

}

private handleOneError(error:any):Job{
  console.log("Error", error);
  return {} as Job;
}


addJob(job:Job){//: Observable<any> {
  /*const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(game);
  console.log(body)*/
  this.http.post(this.baseURL+ "/jobs" ,job).subscribe((result)=>{console.log(result)});//.toPromise().then().catch();
}


/////////////////////////////////////////////////

public deleteOneJob(jobId: any): Promise<Job>{
  const url: string= this.baseURL + "/jobs/" +jobId;

  return this.http.delete(url).toPromise().then( response=> this.gotOneGame(response)).catch(this.handleOneError);
}

///////////////////////////////////////////////////////



public updateJob(job:Job,jobId:any): Promise<Job>{
  const url: string= this.baseURL + "/jobs/" +jobId;

  return this.http.put(url,job).toPromise().then( response=> this.gotOneGame(response)).catch(this.handleOneError);
}


}

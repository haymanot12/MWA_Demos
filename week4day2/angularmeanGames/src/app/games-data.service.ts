// first system dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// second application dependencies
import { Game } from './games-list/games-list.component';

// third declarations
@Injectable({
  providedIn: 'root'
})

// fourth exports
export class GamesDataService {
private baseURL: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { } // shortcut telling TS to create HTTP which is a private attribute
                                            // The value of this attribute is injected by the environment

  public getGames(): Promise<Game[]>{
    // 1. Build URL
    const url: string = this.baseURL + "/games";

    // 2. Tell HTTP service to make a request to
    // 3. Convert the Observable result to a promise
    // 4. Convert the response to JSON
    // 5. Return the response object
    // 6. Catch and handle errors
    return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleError);
  }

  private gotGames(response: any){ // can add :Game[] to the end of (response: any)
    return response as Game[];
  }

  private handleError(error: any){ // can add :Game[] to the end of (error: any)
    console.log("Error", error);
    return [];
  }

  public getOneGame(gameId: any): Promise<Game>{
    const url: string= this.baseURL + "/games/" +gameId;

    return this.http.get(url).toPromise().then( response=> this.gotOneGame(response)).catch(this.handleOneError);
  }

private gotOneGame(response: any):Game{
  return response as Game;

}

private handleOneError(error:any):Game{
  console.log("Error", error);
  return {} as Game;
}

///////////////////////////////////////////////////////////////////////////////////

addGame(game:Game){//: Observable<any> {
  /*const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(game);
  console.log(body)*/
  this.http.post(this.baseURL+ "/games" ,game).subscribe((result)=>{console.log(result)});//.toPromise().then().catch();
}


/////////////////////////////////////////////////

public deleteOneGame(gameId: any): Promise<Game>{
  const url: string= this.baseURL + "/games/" +gameId;

  return this.http.delete(url).toPromise().then( response=> this.gotOneGame(response)).catch(this.handleOneError);
}

///////////////////////////////////////////////////////



public updateGame(game:Game,gameId:any): Promise<Game>{
  const url: string= this.baseURL + "/games/" +gameId;

  return this.http.put(url,game).toPromise().then( response=> this.gotOneGame(response)).catch(this.handleOneError);
}




///////////////////////////////////////////////////////////////////////////////////////

}

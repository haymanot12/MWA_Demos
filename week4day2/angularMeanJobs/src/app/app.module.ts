import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { OrderPipe } from './order.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { GameDetailsComponent } from './game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    OrderPipe,
    HomePageComponent,
    GameDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'jobs',
        component: GamesListComponent,
      },
      {
        path: 'jobs/:jobId',
        component: GameDetailsComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  // bootstrap: [GamesListComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScoreComponent} from "./components/score/score.component";
import {HomeComponent} from "./components/home/home.component";
import {GameComponent} from "./components/game/game.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'score', component: ScoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

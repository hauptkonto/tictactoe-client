import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    GameService
  ]
})
export class TicTacToeModule { }

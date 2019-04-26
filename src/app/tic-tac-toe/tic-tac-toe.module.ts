import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { GameService } from './services/game.service';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [TicTacToeComponent, BoardComponent],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    GameService
  ]
})
export class TicTacToeModule { }

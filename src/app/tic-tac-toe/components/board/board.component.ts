import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { Movement } from '../../models/movement';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public game: Game;
  public board: string[];

  constructor(
    private gameService: GameService
  ) {
    this.gameService.currentGame.subscribe((currentGame) => {
      this.game = currentGame;
      this.setupBoard();
    });
  }

  ngOnInit() {
    this.gameService.NewGame('X');
  }

  setupBoard() {
    if(this.game && this.game.board) {
      this.board = this.game.board.split(',');
    }
  }

  onBoardClick(x, y) {
    const movement: Movement = new Movement();
    movement.gameId = this.game.id;
    movement.playerId = this.gameService.user.id;
    movement.x = x;
    movement.y = y;
    this.gameService.Move(movement);
  }

}

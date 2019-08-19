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
    if (this.game && this.game.board) {
      this.board = this.game.board.split(',');
    }
  }

  onBoardClick(position: number) {
    if (this.game && this.game.status && this.game.status.toLowerCase() === 'ongoing') {
      const movement: Movement = new Movement();
      movement.gameId = this.game.id;
      movement.playerId = this.gameService.user.id;
      movement.position = position;
      this.gameService.Move(movement);
    }
  }

  /**
   * Turns the numeric value shown in the grid into a more common
   * symbol.
   */
  showProperSymbol(symbolIndex: number): string {
    symbolIndex = symbolIndex === undefined ? 0 : symbolIndex;
    const symbols = [' ', 'X', 'O'];
    return symbols[symbolIndex];
  }

  getPlayerNameMessage() {
    let playerNameMessage = '';
    if (this.gameService.user && this.gameService.user.name) {
      playerNameMessage = this.gameService.user.name + ' vs Computer';
    }
    return playerNameMessage;
  }

  restartGame() {
    this.gameService.NewGame('X');
  }
}

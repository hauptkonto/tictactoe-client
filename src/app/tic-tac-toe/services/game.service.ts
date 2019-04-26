import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Game } from '../models/game';
import { promise } from 'protractor';
import { Movement } from '../models/movement';

@Injectable()
export class GameService {
  private url: string;
  public user: User;
  public currentGame: BehaviorSubject<Game> = new BehaviorSubject<Game>(null);

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.url = environment.serverEndpoint;
    this.userService.user.subscribe((usr) => {
      this.user = usr;
    });
  }

  public NewGame(symb: string) {
    let promise = new Promise((resolve, reject) => {
      const game: Game = new Game();
      game.id = this.userService.NewGuid();
      game.player1Id = this.userService.user.value.id;
      game.player2Id = null;
      game.symbol = (symb ? symb : 'X');
      //game.player1 = this.user; // Causes an issue
      game.player2 = null;

      this.http.post(this.url + 'api/Game/NewGame', game).toPromise()
      .then((newGame: Game) => {
        this.currentGame.next(newGame);
        resolve(newGame);
      })
      .catch((err) => { reject(err); });
    });
    return promise;
  }

  /**
   * Obtains a game from the rest-api.
   */
  public LoadGame(gameId: string) {
  return this.http.get(this.url + 'api/Game/GetGame?gameId=' + gameId).toPromise()
    .then((game: Game) => {
      this.currentGame.next(game);
    })
    .catch(this.HandleError);
  }

  public Move(movement: Movement) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.url + 'api/Game/Move', movement).toPromise()
      .then((game: Game) => {
        this.currentGame.next(game);
      })
      .catch(this.HandleError);
    });
    return promise;
  }

  /**
   * Simple Error handling.
   */
  private HandleError(err: any) {
  console.error(err);
}
}

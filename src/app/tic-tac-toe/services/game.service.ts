import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Game } from '../models/game';

@Injectable()
export class GameService {
  private url: string;
  private user: User;
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
    const game: Game = new Game();
    game.Id = this.userService.NewGuid();
    game.Player1Id = this.user.Id;
    game.Player2Id = null;
    game.Symbol = (symb ? symb : 'X');
    game.Player1 = this.user;
    game.Player2 = null;

    return this.http.post(this.url + 'api/Game/NewGame', game).toPromise()
    .then((newGame: Game) => {
      this.currentGame.next(newGame);
    })
    .catch(this.HandleError);
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

  /**
   * Simple Error handling.
   */
  private HandleError(err: any) {
    console.error(err);
  }
}

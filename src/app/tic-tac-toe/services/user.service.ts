import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.serverEndpoint;
  }

  /**
   * Obtains a user from the rest-api.
   */
  public LoadUserByName(username: string) {
    return this.http.get(this.url + 'api/Users/ByName/' + username).toPromise()
    .then((user: User) => {
      this.user.next(user);
    })
    .catch(this.HandleError);
  }

  /**
   * Obtains a user from the rest-api.
   */
  public LoadUser(userId: string) {
    return this.http.get(this.url + 'api/Users/' + userId).toPromise()
    .then((user: User) => {
      this.user.next(user);
    })
    .catch(this.HandleError);
  }

  /**
   * Stores a user in the server.
   */
  public PostUser(username: string) {
    const body: User = {id: this.NewGuid(), name: username};
    return this.http.post(this.url + 'api/Users', body).toPromise()
    .then((user: User) => {
      this.user.next(user);
    })
    .catch(this.HandleError);
  }

  /**
   * Used to mock the GUID creation.
   */
  private NewGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      let r = Math.random() * 16 | 0;
      // tslint:disable-next-line:no-bitwise
      let v = (c === 'x') ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Simple Error handling.
   */
  private HandleError(err: any) {
    console.error(err);
  }
}

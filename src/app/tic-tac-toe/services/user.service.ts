import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.serverEndpoint;
  }

  /**
   * Obtains a user from the rest-api.
   */
  public LoadUserByName(username: string) {
    let promise = new Promise((resolve, reject) => {
      return this.http.get(this.url + 'api/user/ByName/' + username).toPromise()
      .then((user: User) => {
        this.user.next(user);
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  /**
   * Stores a user in the server.
   */
  public PostUser(username: string) {
    let promise = new Promise((resolve, reject) => {
      const body: User = {id: this.NewGuid(), name: username};
      return this.http.post(this.url + 'api/user', body).toPromise()
      .then((user: User) => {
        this.user.next(user);
        resolve(user);
      })
      .catch( (err) => {
        this.HandleError(err);
        reject(err);
      });
    });
    return promise;
  }

  /**
   * Used to mock the GUID creation.
   */
  public NewGuid() {
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

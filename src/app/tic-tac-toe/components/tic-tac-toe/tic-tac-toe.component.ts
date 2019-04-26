import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  private user: User;
  public userIsSet = false;

  constructor(
    private userService: UserService
  ) {
    this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  SubmitUsername() {
    this.userService.LoadUserByName(this.user.name)
    .then((obtainedUser: User) => {
      if (obtainedUser) {
        this.user = obtainedUser;
        this.userIsSet = true;
      }
    }).catch((err) => {
      if (err.statusText.includes('Not Found')) {
        this.userService.PostUser(this.user.name)
        .then((postedUser: User) => {
          this.user = postedUser;
          this.userIsSet = true;
        });
      }
    });
  }
}

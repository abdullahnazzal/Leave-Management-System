import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../User';
import { AuthService } from '../../service/auth.service';
import { LoginComponent } from '../login/login.component';
import { SharedServiceService } from '../../service/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser!: User[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedServiceService: SharedServiceService,
  ) {}

  HandleUserHeader: Subscription = new Subscription();

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.HandleUserHeader = this.sharedServiceService
      .getHandleUserHeader()
      .subscribe(() => {
        this.currentUser = this.authService.user;
      });
  }

  ngOnDestroy(): void {
    this.HandleUserHeader.unsubscribe();
  }

  logoutHandler() {
    this.authService.logout();
    if (localStorage.getItem('loggedIn')) {
      this.router.navigate(['']);
    }
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  getUser() {
    if (this.currentUser[0]) {
      return this.currentUser[0].userName;
    }
    return;
  }
}

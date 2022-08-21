import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/User';
import { AuthService } from '../../service/auth.service';
import { SharedServiceService } from '../../service/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser!: User[];
  @Input() imgURL!:String;
  expandedElement:boolean=false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedServiceService: SharedServiceService
  ) {}

  HandleUserHeader: Subscription = new Subscription();

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.imgURL=this.currentUser[0].imgURL;
    this.HandleUserHeader = this.sharedServiceService
      .getHandleUserHeader()
      .subscribe(() => {
        this.currentUser = this.authService.user;
      });
  }
  onClick() {
    console.log(this.authService.user[0].id);
    console.log(this.currentUser);

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
    if (this.authService.user[0]) {
      return this.authService.user[0]?.userName;
    }
    return;
  }
  toggleArrow(...close:any){
    console.log(close[0].closed);
    if (close !== null) {
      if (close[0].closed === false) {
        this.expandedElement= !this.expandedElement;
        }
    }
    this.expandedElement= !this.expandedElement;
  }
}

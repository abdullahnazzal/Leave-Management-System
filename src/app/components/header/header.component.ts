import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../User';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:User[]

  constructor(private router:Router,private authService:AuthService) {   }

  ngOnInit(): void {
    // if (this.user) {
      this.user=this.authService.user;
    // }
  }
  logoutHandler(){
    console.log(localStorage.getItem('loggedIn')+ "localStorage.getItem('loggedIn')");
    // localStorage.removeItem('loggedIn')
    // localStorage.removeItem('user')
    // this.authService.setLoginSatatus(false)
    // this.authService.setUser([])
    this.authService.logout()
    console.log(this.authService.loginSatatus+"this.authService.loginSatatus");
    console.log(!localStorage.getItem('loggedIn'));

    if (localStorage.getItem('loggedIn')) {
      console.log("this.authService.loginSatatus"+this.authService.loginSatatus);
      console.log("this.authService.user"+this.authService.user);
      console.log("localStorage.length"+localStorage.length);
      console.log("localStorage.length"+localStorage.length);


      this.router.navigate([''])
    }
  }
  hasRoute(route:string){
    return this.router.url === route
  }

  getUser(){
    if (this.user[0]) {
      return this.user[0].userName
    }
    return
  }
}

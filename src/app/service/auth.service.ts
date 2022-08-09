import { Injectable } from '@angular/core';
import { User } from "../user/User";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user:User[]=JSON.parse(localStorage.getItem("user") || "false");
  message!:string;

  private isLoginStatus:boolean=JSON.parse(localStorage.getItem("loggedIn") || "false");

  constructor() { }

  setUser(user:User[]):void{
    this.user=user;
    localStorage.setItem("user",JSON.stringify(this.user))
  }

  setLoginSatatus(value:boolean):void{
    this.isLoginStatus=value;
    localStorage.setItem("loggedIn",`${value}`)
  }

  get loginSatatus():boolean{
    return JSON.parse(localStorage.getItem("loggedIn") || this.isLoginStatus.toString());
  }

  logout(){
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    this.setLoginSatatus(false);
    this.setUser([]);
  }

  getMessage(){
    if (!this.user.length) {
      this.message="who the f are you";
    }
    else{
      this.message="MESSAGE";
    }
  }
}

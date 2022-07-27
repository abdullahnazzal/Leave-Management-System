import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL="http://localhost:5000/user";
  constructor(private http:HttpClient) { }

  getUser():Observable<User[]>{
    return this.http.get<User[]>(this.apiURL) ;
  }

  getUserById(user:User):Observable<User>{
    return this.http.get<User>(`${this.apiURL}/${user.id}`)
  }
}

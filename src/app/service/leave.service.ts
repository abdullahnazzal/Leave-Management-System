import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Leave } from '../Leave';
import { Observable } from 'rxjs';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiURL : string = "http://localhost:5000/leaves";

  constructor(private httpClient:HttpClient) { }

  getLeaves():Observable<Leave[]>{
    return this.httpClient.get<Leave[]>(this.apiURL);
  }

  addLeave(leave:Leave):Observable<Leave>{
    return this.httpClient.post<Leave>(this.apiURL,leave,httpOptions)
  }

  updateLeave(leave:Leave, id:any):Observable<Leave>{
    return this.httpClient.put<Leave>(`${this.apiURL}/${id}`,leave,httpOptions)
  }
}

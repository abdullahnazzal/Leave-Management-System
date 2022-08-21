import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Leave } from '../user/Leave';
import { Observable, Subject } from 'rxjs';
import { LeaveShow } from '../user/list/list.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private apiURL: string = 'http://localhost:8080/api/v1/leave';
  reasonOfReject!: string;

  constructor(private httpClient: HttpClient) {}
  // http://localhost:8080/api/v1/leave?userId=2
  getAllLeaves(): Observable<Leave[]> {
    return this.httpClient.get<Leave[]>(`${this.apiURL}/all`);
  }

  // http://localhost:8080/api/v1/leave?userId=2
  getLeaves(userId: Number): Observable<Leave[]> {
    return this.httpClient.get<Leave[]>(`${this.apiURL}?userId=${userId}`);
  }

  // http://localhost:8080/api/v1/leave/?userId=1&status=2
  getLeavesByStatus(userId: Number, status: Number): Observable<Leave[]> {
    return this.httpClient.get<Leave[]>(
      `${this.apiURL}/?userId=${userId}&status=${status}`
    );
  }

  addLeave(leave: Leave): Observable<Leave> {
    return this.httpClient.post<Leave>(this.apiURL, leave, httpOptions);
  }

  updateLeave(leave: any, id: any): Observable<Leave> {
    return this.httpClient.put<Leave>(
      `${this.apiURL}/${id}`,
      leave,
      httpOptions
    );
  }
  setReasonOfReject(reason: string) {
    this.reasonOfReject = reason;
  }
  getReasonOfReject(): string {
    return this.reasonOfReject;
  }
}

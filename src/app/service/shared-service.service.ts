import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  handleUserHeader = new Subject();

  constructor() { }

  getHandleUserHeader(){
    return this.handleUserHeader.asObservable();
  }

}

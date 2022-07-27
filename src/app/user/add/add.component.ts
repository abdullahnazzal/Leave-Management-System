import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LeaveService } from '../../service/leave.service';
import { Leave } from '../../Leave';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';


interface TypeLeave {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  @Output() onAddLeaveOutput:EventEmitter<Leave>=new EventEmitter();
  leaves:Leave[]=[];
  type!:string;
  startDay!:string;
  endDay!:string;
  description!:string;
  selectedValue!: string;
  typeLeave: TypeLeave[] = [
    {value: 'sick leave', viewValue: 'sick leave'},
    {value: 'annual vacation', viewValue: 'annual vacation'}
  ];

  constructor(
    private leaveService:LeaveService,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.leaveService.getLeaves().subscribe((leave)=>{this.leaves=leave});
  }

  addLeaveHandler(){
    if (!this.startDay || !this.endDay || !this.description ) {
      alert("please fill the text!");
      return;
    }
    var leave={
      "id": this.leaves.length+1,
      "type": this.selectedValue,
      "startDate":this.startDay,
      "endDate": this.endDay,
      "description": this.description,
      "results": "waiting",
      "userId": this.authService.user[0].id
    }

    // this.onAddLeaveOutput.emit(leave)
    this.leaveService.addLeave(leave).subscribe((leave)=>(this.leaves.push(leave)))

  }
  myListNav(){
    this.router.navigate(['user/list'])
  }

}

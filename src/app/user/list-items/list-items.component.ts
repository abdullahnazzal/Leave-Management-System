import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Leave } from '../../Leave';
import { AuthService } from '../../service/auth.service';
import { User } from '../../User';
import { UserService } from '../../service/user.service';
import { LeaveService } from '../../service/leave.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  @Input() leave!:Leave
  @Output() handleApproveOutput:EventEmitter<Leave>=new EventEmitter()
  @Output() handleRejectOutput:EventEmitter<Leave>=new EventEmitter()

  user:User[]=[]
  constructor(
    private authService:AuthService,
    private userService:UserService,
    private leaveService:LeaveService
    ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((u)=>{u.find((x)=>{
      if (x.id === this.leave.userId) {
        this.user.push(x)
      }
      // return

    })})
    console.log("this.user: ",this.user);
  }

  //If status of leaves is waiting return true
  handlePendingImg(){
    if (this.leave.results === "waiting") {
      return true;
    }
    return false;
  }
  //If status of leaves is aprove return true
  handleApproveImg(){
    if (this.leave.results === "aprove") {
      return true;
    }
    return false;
  }
  //If status of leaves is rejected return true
  handleRejectedImg(){
    if (this.leave.results === "rejected") {
      return true;
    }
    return false;
  }

  isUser(){
    return this.authService.user[0].staff === "employee";
  }

  handleApprove(){
    var leave={
      "id": this.leave.id,
      "type": this.leave.type,
      "startDate":this.leave.startDate,
      "endDate": this.leave.endDate,
      "description": this.leave.description,
      "results": "aprove",
      "userId": this.leave.userId
    }
    // console.log(leave);
    // console.log(this.leave);
    this.handleApproveOutput.emit(leave)
    // this.leaveService.updateLeave(leave,leave.id).subscribe((res)=>{})

  }handleReject(){
    var leave={
      "id": this.leave.id,
      "type": this.leave.type,
      "startDate":this.leave.startDate,
      "endDate": this.leave.endDate,
      "description": this.leave.description,
      "results": "rejected",
      "userId": this.leave.userId
    }
    // console.log(leave);
    // console.log(this.leave);
    this.handleRejectOutput.emit(leave)
    // this.leaveService.updateLeave(leave,leave.id).subscribe((res)=>{})

  }
}

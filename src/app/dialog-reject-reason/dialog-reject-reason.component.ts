import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../service/leave.service';

@Component({
  selector: 'app-dialog-reject-reason',
  templateUrl: './dialog-reject-reason.component.html',
  styleUrls: ['./dialog-reject-reason.component.css']
})
export class DialogRejectReasonComponent implements OnInit {
  reason!: string;
  constructor(
    private leaveService:LeaveService
  ) { }

  ngOnInit(): void {
  }
  handleReasonOfReject(){
    // this.reason = reason
    this.leaveService.setReasonOfReject(this.reason);
    // this.leaveService.getReasonOfReject()
    console.log(this.leaveService.getReasonOfReject());

  }
}

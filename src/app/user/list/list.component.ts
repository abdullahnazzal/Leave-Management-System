import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../User';
import { AuthService } from '../../service/auth.service';
import { Leave } from '../Leave';
import { LeaveService } from '../../service/leave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Output() onAddLeaveEmitter: EventEmitter<Leave> = new EventEmitter();
  userName?: string;
  leaves: Leave[] = [];
  message!: string;

  leavesForManger: Leave[] = [];

  constructor(
    private authService: AuthService,
    private leaveService: LeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.loginSatatus === true) {
      this.authService.user;
      this.authService.getMessage();
      this.message = this.authService.message;
    }

    this.leaveService.getLeaves().subscribe((leaves) => {
      leaves.findIndex((x) => {
        if (x.userId === this.authService.user[0].id) {
          this.leaves.push(x);
        }
      });
    });

    this.leaveService.getLeaves().subscribe((leave) => {
      leave.findIndex((x) => {
        if (x.results === 'waiting') {
          this.leavesForManger.push(x);
        }
      });
    });

    // this.HandleUserHeader = this.sharedServiceService
    //   .getHandleUserHeader()
    //   .subscribe(() => {
    //     this.currentUser = this.authService.user;
    //   });
  }

  onClick() {
    this.onAddLeaveEmitter.emit();
    this.router.navigate(['user/add']);
  }
  isUser() {
    return this.authService.user[0].staff === 'employee';
  }
  handleApprove(leave: Leave) {
    this.leaveService.updateLeave(leave, leave.id).subscribe((res) => {
      this.leavesForManger = this.leavesForManger.filter(
        (x) => x.id !== leave.id
      );
    });
  }

  handleReject(leave: Leave) {
    this.leaveService.updateLeave(leave, leave.id).subscribe((res) => {
      this.leavesForManger = this.leavesForManger.filter(
        (x) => x.id !== leave.id
      );
    });
  }

  isLeaveEmpty() {
    if (this.leavesForManger.length === 0) {
      return true;
    }
    return false;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Leave } from '../Leave';
import { AuthService } from '../../service/auth.service';
import { User } from '../User';
import { UserService } from '../../service/user.service';
import { LeaveService } from '../../service/leave.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogApproveConfirmComponent } from '../../dialog-approve-confirm/dialog-approve-confirm.component';
import { DialogRejectReasonComponent } from '../../dialog-reject-reason/dialog-reject-reason.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
  @Input() leave!: Leave;
  @Output() handleApproveOutput: EventEmitter<Leave> = new EventEmitter();
  @Output() handleRejectOutput: EventEmitter<Leave> = new EventEmitter();

  user: User[] = [];


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private leaveService: LeaveService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((u) => {
      u.find((x) => {
        if (x.id === this.leave.userId) {
          this.user.push(x);
        }
      });
    });
  }

  //If status of leaves is waiting return true
  handlePendingImg() {
    if (this.leave.status === 'waiting') {
      return true;
    }
    return false;
  }
  //If status of leaves is aprove return true
  handleApproveImg() {
    if (this.leave.status === 'aprove') {
      return true;
    }
    return false;
  }
  //If status of leaves is rejected return true
  handleRejectedImg() {
    if (this.leave.status === 'rejected') {
      return true;
    }
    return false;
  }

  isUser() {
    return this.authService.user[0].staff === 'employee';
  }

  handleApprove() {
    var leave = {
      id: this.leave.id,
      type: this.leave.type,
      startDate: this.leave.startDate,
      endDate: this.leave.endDate,
      description: this.leave.description,
      status: 'aprove',
      reasonOfReject: 'none',
      userId: this.leave.userId,
      mangerId: this.authService.user[0],
    };

    let dialogRef = this.dialog.open(DialogApproveConfirmComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.handleApproveOutput.emit(leave);
      }
    });
  }
  handleReject() {
    let dialogRef2 = this.dialog.open(DialogRejectReasonComponent);
    dialogRef2.afterClosed().subscribe((result) => {
      if (result === 'true') {
        const currentLeave = {
          id: this.leave.id,
          type: this.leave.type,
          startDate: this.leave.startDate,
          endDate: this.leave.endDate,
          description: this.leave.description,
          status: 'rejected',
          reasonOfReject: this.leaveService.getReasonOfReject(),
          userId: this.leave.userId,
          userResultId: this.authService.user[0].id,
        };
        this.handleRejectOutput.emit(currentLeave);
      }
    });
  }

  formatDate(str: string) {
    let formated;
    formated = `${str.substring(5, 7)}mon ${str.substring(
      8,
      10
    )}d ${str.substring(11, 13)}h ${str.substring(14, 16)}min`;

    return formated;
  }
}

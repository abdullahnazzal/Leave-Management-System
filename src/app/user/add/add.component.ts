import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LeaveService } from '../../service/leave.service';
import { Leave } from '../../Leave';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogAddErrorComponent } from '../../dialog-add-error/dialog-add-error.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddConfirmComponent } from '../../dialog-add-confirm/dialog-add-confirm.component';
interface TypeLeave {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Output() onAddLeaveOutput: EventEmitter<Leave> = new EventEmitter();
  leaves: Leave[] = [];
  type!: string;
  description!: string;
  selectedValue!: string;
  typeLeave: TypeLeave[] = [
    { value: 'sick leave', viewValue: 'sick leave' },
    { value: 'annual vacation', viewValue: 'annual vacation' },
  ];
  startDay = new FormControl();
  endDay = new FormControl();
  min: any;
  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.leaveService.getLeaves().subscribe((leave) => {
      this.leaves = leave;
    });
    this.startDay;
    var today = new Date();
    this.startDay.setValue(
      today.toISOString().slice(0, today.toISOString().length - 5)
    );

    this.min = today.toISOString().slice(0, today.toISOString().length - 5);
  }

  addLeaveHandler() {
    // console.log(this.selectedValue);

    if (!this.endDay.valid || !this.description || !this.selectedValue) {
      this.dialog.open(DialogAddErrorComponent);
      return;
    }
    var leave={
      "id": this.leaves.length+1,
      "type": this.selectedValue,
      "startDate":this.startDay.value,
      "endDate": this.endDay.value,
      "description": this.description,
      "results": "waiting",
      "reasonOfReject": 'none',
      "userId": this.authService.user[0].id
    }
    let dialogRef =this.dialog.open(DialogAddConfirmComponent);
        dialogRef.afterClosed().subscribe(result=>{
          if (result === 'true') {
            // console.log(`Dialog: ${result}`);
            this.onAddLeaveOutput.emit(leave)
            this.leaveService.addLeave(leave).subscribe((leave)=>(this.leaves.push(leave)))
            this.router.navigate(['user/list']);
          }

        })
  }
  myListNav() {
    this.router.navigate(['user/list']);
  }
}

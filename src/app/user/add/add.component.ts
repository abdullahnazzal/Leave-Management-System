import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { LeaveService } from '../../service/leave.service';
import { Leave } from '../Leave';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogAddErrorComponent } from '../../dialog-add-error/dialog-add-error.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddConfirmComponent } from '../../dialog-add-confirm/dialog-add-confirm.component';
import { MatTable } from '@angular/material/table';
import { LeaveShow } from '../list/list.component';
import { DialogLoadingComponent } from 'src/app/dialog-loading/dialog-loading.component';

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
  @ViewChild(MatTable) table!: MatTable<LeaveShow>;

  leaveFormGroup!: FormGroup;
  leaves: Leave[] = [];
  typeLeave: TypeLeave[] = [
    { value: 'sick leave', viewValue: 'sick leave' },
    { value: 'annual vacation', viewValue: 'annual vacation' },
  ];

  min: any;
  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.leaveFormGroup = formBuilder.group({
      startDay: new FormControl(),
      endDay: new FormControl(),
      description: new FormControl(),
      selectedValue: new FormControl(),
    });
  }

  ngOnInit(): void {
    // this.leaveService.getLeaves().subscribe((leave) => {
    //   this.leaves = leave;
    // });
    // this.leaveService.getLeaves().subscribe((leaves) => {
    //   leaves.findIndex((leave) => {
    //     if (leave.userId?.id === this.authService.user[0].id) {
    //       this.leaves.push(leave);
    //     }
    //   });
    // });
    var today = new Date();
    this.leaveFormGroup.patchValue({
      startDay: today.toISOString().slice(0, today.toISOString().length - 5),
    });

    this.min = today.toISOString().slice(0, today.toISOString().length - 5);
  }

  addLeaveHandler() {
    if (!this.leaveFormGroup.valid) {
      this.dialog.open(DialogAddErrorComponent);
      return;
    }

    var leave = {
      type: this.leaveFormGroup.value.selectedValue,
      startDate: this.leaveFormGroup.value.startDay,
      endDate: this.leaveFormGroup.value.endDay,
      description: this.leaveFormGroup.value.description,
      status: 'PENDING',
      reasonOfReject: 'none',
      userId: this.authService.user[0],
      mangerId: null,
    };
    console.log(this.leaves);

    let dialogRef = this.dialog.open(DialogAddConfirmComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.leaveService
          .addLeave(leave)
          .subscribe((ss) => this.leaves.push(ss));
          let dialogLoadingRef = this.dialog.open(DialogLoadingComponent);
          dialogLoadingRef.afterOpened().subscribe(()=>{
            setTimeout(() => {dialogLoadingRef.close(); this.router.navigate(['user/list'])} ,1000);

          });
      }
    });
    // dialogLoadingRef
  }
  myListNav() {
    this.router.navigate(['user/list']);
  }
}

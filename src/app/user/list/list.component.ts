import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../User';
import { AuthService } from '../../service/auth.service';
import { Leave } from '../Leave';
import { LeaveService } from '../../service/leave.service';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogApproveConfirmComponent } from 'src/app/dialog-approve-confirm/dialog-approve-confirm.component';
import { DialogRejectReasonComponent } from 'src/app/dialog-reject-reason/dialog-reject-reason.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
// import { LeaveShow } from '../list-items/list-items.component';
export interface LeaveShow {
  type: string;
  position: string;
  date: string;
  status: string;
}

export interface LeaveShowManger {
  id: number;
  type: string;
  position: string;
  date: string;
  user: string;
  description: string;
  startDate: string;
  endDate: string;
  userId: User | null | undefined;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListComponent implements OnInit {
  @Output() onAddLeaveEmitter: EventEmitter<Leave> = new EventEmitter();
  @ViewChild(MatTable) table!: MatTable<LeaveShow[]>;
  status?: Number;
  userName?: string;
  leaves: Leave[] = [];
  leavesForManger: Leave[] = [];

  displayedColumns: string[] = ['position', 'type', 'date', 'status'];

  dataSource: MatTableDataSource<LeaveShow> = new MatTableDataSource<LeaveShow>();
  // x : MatTableDataSource<any>;
  dataSourceManger: MatTableDataSource<LeaveShowManger> = new MatTableDataSource<LeaveShowManger>();
  displayedColumnsManger: string[] = ['#', 'type', 'user'];
  columnsToDisplayWithExpand = [...this.displayedColumnsManger, 'expand'];
  expandedElement!: LeaveShowManger | null;
  message!: string;
  // dataSource: LeaveShow[]=[{ position: "1", type: 'Sick Leave', date: "1.0079", status: 'H' }];
  // dataSource= ELEMENT_DATA;
  // dataSource=this.leaveService.getLeavesToShows(this.leaves);

  constructor(
    private authService: AuthService,
    private leaveService: LeaveService,
    private router: Router,
    private dialog: MatDialog
  ) {
    // this.dataSource=[]
  }

  ngOnInit(): void {
    if (this.authService.loginSatatus === true) {
      this.authService.user;
      this.authService.getMessage();
      this.message = this.authService.message;
    }
    // Get All Leaves That belong to normal user if normal user was login
    // Push leaves that belong to current user to leaves Array
    // Push leaves that belong to current user to dataSource Array By This Format[{ position, type, date, status}]
    this.leaveService
      .getLeaves(Number(this.authService.user[0].id))
      .subscribe((leaves) => {
        this.dataSource.data = [];
        this.table.renderRows();
        this.leaves = [];
        this.leaves = leaves;
        this.leaves.map((leave) => {
          this.dataSource.data.push({
            position: String(leave.id),
            type: leave.type,
            date: leave.endDate,
            status: leave.status,
          });
          this.table.renderRows();
        });
      });

    // Get All Leaves That belong to Manger user if Manger user was login
    // Push leaves that belong to current user to leavesForManger Array
    // Push leaves that belong to current user to dataSourceManger Array By This Format[{ position, type, date, status}]

    this.leaveService
      .getAllLeaves()
      .subscribe((leaves) => {
        this.dataSourceManger.data = [];
        this.table.renderRows();
        this.leavesForManger = [];
        leaves.map((leave)=>{
          if (leave.status ==="PENDING") {
            this.leavesForManger.push(leave);
          }
        })

        this.leavesForManger.map((leave) => {
          this.dataSourceManger.data.push({
            id: Number(leave.id),
            position: String(leave.id),
            type: leave.type,
            date: leave.endDate,
            user:
              String(leave.userId?.firstName) +
              ' ' +
              String(leave.userId?.lastName),
            description: leave.description,
            startDate: leave.startDate,
            endDate: leave.endDate,
            userId: leave.userId,
          });
          this.table.renderRows();
        });
      });

    // -------------------------------------------------------------//
    // this.leaveService
    //   .getLeaves(Number(this.authService.user[0].id))
    //   .subscribe((leaves) => {
    //     this.dataSourceManger.data = [];
    //     this.table.renderRows();
    //     this.leavesForManger = [];
    //     this.leavesForManger = leaves;
    //     this.leavesForManger.map((leave) => {
    //       this.dataSourceManger.data.push({
    //         id: Number(leave.id),
    //         position: String(leave.id),
    //         type: leave.type,
    //         date: leave.endDate,
    //         user:
    //           String(leave.userId?.firstName) +
    //           ' ' +
    //           String(leave.userId?.lastName),
    //         description: leave.description,
    //         startDate: leave.startDate,
    //         endDate: leave.endDate,
    //         userId: leave.userId,
    //       });
    //       this.table.renderRows();
    //     });
    //   });
  }

  onClick() {
    this.onAddLeaveEmitter.emit();
    this.router.navigate(['user/add']);
  }
  isUser() {
    return this.authService.user[0].staff === 'employee';
  }

  handleApprove(l: LeaveShowManger) {
    var leave = {
      status: 'APPROVED',
      mangerId: this.authService.user[0],
    };

    console.log(leave);
    console.log(l);
    console.log(this.leavesForManger);

    let dialogRef = this.dialog.open(DialogApproveConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        console.log('TRUE');
        this.leaveService.updateLeave(leave, l.position).subscribe();
        this.dataSourceManger.data.forEach((e, i) => {
          if (e.id === l.id) {
            this.dataSourceManger.data.splice(i, 1);
          }
        });
        this.table.renderRows();
      }
    });
  }
  handleReject(l: any) {
    let dialogRef2 = this.dialog.open(DialogRejectReasonComponent);
    dialogRef2.afterClosed().subscribe((result) => {
      if (result === 'true') {
        const currentLeave = {
          status: 'REJECTED',
          reasonOfReject: this.leaveService.getReasonOfReject(),
          mangerId: this.authService.user[0],
        };
        this.leaveService.updateLeave(currentLeave, l.position).subscribe();
        this.dataSourceManger.data.forEach((e, i) => {
          if (e.id === l.id) {
            this.dataSourceManger.data.splice(i, 1);
          }
        });
        // this.table.renderRows();
      }
    });
  }
  isLeaveEmpty() {
    if (this.leavesForManger.length === 0) {
      return true;
    }
    return false;
  }

  formatDate(str: string) {
    let formated;
    formated = `${str.substring(5, 7)}mon ${str.substring(
      8,
      10
    )}d ${str.substring(11, 13)}h ${str.substring(14, 16)}min`;

    return formated;
  }
  filter(...status: any) {
    if (status.length != 0) {
      this.dataSource.data = [];
      this.table.renderRows();
      this.leaves = [];
      this.leaveService.getLeavesByStatus(Number(this.authService.user[0].id), status).subscribe((leaves) => {
        this.leaves = leaves;
        this.leaves.map((leave) => {
          this.dataSource.data.push({
            position: String(leave.id),
            type: leave.type,
            date: leave.endDate,
            status: leave.status,
          });
          this.table.renderRows();
        });
      });
    } else {
      this.dataSource.data = [];
      this.leaves = [];
      this.table.renderRows();
      this.leaveService
      .getLeaves(Number(this.authService.user[0].id))
      .subscribe((leaves) => {
        this.leaves = leaves;
        this.leaves.map((leave) => {
          this.dataSource.data.push({
            position: String(leave.id),
            type: leave.type,
            date: leave.endDate,
            status: leave.status,
          });
          this.table.renderRows();
        });
      });
    }
  }
}

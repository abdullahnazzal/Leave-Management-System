import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../user/User';
import { AuthService } from '../../service/auth.service';
import { SharedServiceService } from '../../service/shared-service.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginErrorComponent } from '../../dialog-login-error/dialog-login-error.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() date!: string;
  user: User[] = [];
  valid: boolean = true;
  @ViewChild('email') inputEmail: any;
  @ViewChild('password') inputPassword: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private sharedServiceService: SharedServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => (this.user = user));
  }

  loginHandler() {
    if (
      this.emailFormControl.value &&
      this.passwordFormControl.value &&
      this.emailFormControl.valid
    ) {
      let userValid;
      userValid = this.user.filter((user) => {
        return (
          user.email === this.emailFormControl.value &&
          user.password === this.passwordFormControl.value
        );
      });
      this.sharedServiceService.handleUserHeader.next(userValid);
      if (userValid.length !== 0) {
        this.valid = true;
        this.authService.setUser(userValid);
        this.authService.setLoginSatatus(true);
        this.router.navigate(['user/list']);
      } else {
        this.valid = false;
        let dialogRef = this.dialog.open(DialogLoginErrorComponent);
        dialogRef.afterClosed().subscribe(() => {
          this.emailFormControl.reset();
          this.passwordFormControl.reset();
        });
      }
    }
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}

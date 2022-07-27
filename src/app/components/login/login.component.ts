import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../User';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user :User[]=[];
  emailUser !:string;
  password !:string;
  valid:boolean=true;
  @Input() date!:string;


  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(
    private userService:UserService,
    private router:Router,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user)=>(this.user=user));
    console.log(this.authService.loginSatatus);
  }

  loginHandler(){
    let userValid;
    userValid= this.user.filter((user)=>{
      return user.email === this.emailUser && user.password === this.password
    });
    // console.log(userValid);

    if (userValid.length!==0) {
      // alert("Invaild UserName or Password")
      this.valid=true;
      this.authService.setUser(userValid)
      // this.authService.user=userValid;
      this.authService.setLoginSatatus(true)
      this.router.navigate(['user/list'])
      // console.log("userValid.length!==0 TRUE");
      // console.log(this.authService.user);


    }
    else {
      this.valid=false;
      // this.router.navigateByUrl('/')
      console.log("else FALSE");
    }
  }

  hasRoute(route:string){
    return this.router.url === route
  }
}

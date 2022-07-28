import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'leaves-app';

  constructor(
    private router: Router,
    private authService:AuthService
    ) {}

  hasRoute(route: string) {
    return this.router.url === route;
  }

  // handleHeader(componentRef: any) {
  //   const child: LoginComponent = componentRef;
  //   child.handleUserHeaderOuput.subscribe(() => {
  //     this.user = this.authService.user;
  //   });
  // }
}

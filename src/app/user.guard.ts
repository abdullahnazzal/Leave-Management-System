import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.loginSatatus !== false) {
        this.router.navigate(['user/list']);
        // console.log(this.authService.loginSatatus);
      }
      // if (this.authService.loginSatatus === true) {
      //   this.router.navigate(['']);
      // console.log(this.authService.loginSatatus);

      // }

      return !this.authService.loginSatatus;
  }

}

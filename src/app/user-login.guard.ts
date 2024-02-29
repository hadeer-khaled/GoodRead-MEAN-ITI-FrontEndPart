import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  UserLogged = localStorage.getItem('UserLogged')


  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isUserLoggedIn() ) {
      return true;
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('UserLogged')
      console.log(localStorage.getItem('UserLogged'))
      this.UserLogged = null
      return this.router.parseUrl('/');
    }
  }
}


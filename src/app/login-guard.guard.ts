import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  AdminLogged = localStorage.getItem('AdminLogged')


  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isAdminLoggedIn() ) {
      return true;
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('AdminLogged')
      localStorage.removeItem('loggedUser');
      localStorage.removeItem('role');
      console.log(localStorage.getItem('AdminLogged'))
      this.AdminLogged = null
      return this.router.parseUrl('/');
    }
  }
}



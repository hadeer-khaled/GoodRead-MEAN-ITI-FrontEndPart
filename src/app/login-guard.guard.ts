// // import { INJECTOR, Injectable } from '@angular/core';
// // import { CanActivateFn } from '@angular/router';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export const loginGuardGuard: CanActivateFn = (route, state) => {

// //   return true;
// // };

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AdminService } from './services/admin.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class AdminAuthGuard implements CanActivate {

//   constructor(private authService: AdminService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAdminLoggedIn()) {
//       return true; 
//     } else {
//       this.router.navigate(['/admin/login']); 
//       return false; 
//     }
//   }
// }

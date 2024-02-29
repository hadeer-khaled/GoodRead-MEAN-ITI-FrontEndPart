import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  role = localStorage.getItem('role')
  isAdminLoggedIn(): boolean {
    return this.role === 'admin'
  }
  isUserLoggedIn(): boolean {
    return this.role === 'user'
  }
  
}


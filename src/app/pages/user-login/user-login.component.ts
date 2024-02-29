import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../interfaces/users';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  logObj!: Users;
  errorMessage = null;
  token: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: UserService) {
    this.logObj = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role : ''
    };
  }

  checkLoggedIn() {
    const token = localStorage.getItem('token');
    console.log(token);
    this.isLoggedIn = !!token;
  }

  onSubmit(form:any){
    const credentials = {username: this.logObj.username, password: this.logObj.password };
    this.http.login(credentials).subscribe(response => {
      localStorage.setItem('token', (response.data));
      console.log('token',localStorage.getItem('token'));
      this.checkLoggedIn();
      console.log(this.isLoggedIn);
      const jwtToken = response.data;
          const tokenParts = jwtToken.split('.');
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('payload',payload)
          localStorage.setItem('UserLogged', (payload.userExist.firstName));
          console.log('UserLogged',localStorage.getItem('UserLogged'));
          const role = payload.userExist.role;
          console.log('role', role);
          localStorage.setItem('role', (payload.userExist.role));
             this.router.navigate(['/userHome']);
                  }, error => {
      console.error('Error logging in:', error.errorMessage);
    });
  }
}
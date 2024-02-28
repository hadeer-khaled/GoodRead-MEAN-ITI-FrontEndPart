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
  
  onSubmit(form:any){
    const credentials = {username: this.logObj.username, password: this.logObj.password };
    this.http.login(credentials).subscribe(response => {
    console.log('User logged in successfully:', response);
    localStorage.setItem('token',(response.data));
    console.log(localStorage.getItem('token'));
    localStorage.setItem('loggedUser', JSON.stringify(credentials.username));
    console.log(localStorage.getItem('loggedUser'))
    this.router.navigate(['/userAccount']);
  }, error => {
    console.error('Error logging in:', error.errorMessage);
  });
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../interfaces/users';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  logObj!: Users;
  errorMessage = null;
  token: string = '';

  constructor(private router: Router, private http: AdminService) {
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
    localStorage.setItem('token', JSON.stringify(response.data));
    localStorage.setItem('loggedUser', JSON.stringify(credentials.username));
    console.log(localStorage.getItem('loggedUser'))
    this.router.navigate(['/adminControlPage']);
  }, error => {
    console.error('Error logging in:', error.errorMessage);
  });
  }
}

  // -------------------------- add admin ---------------------- \\
  //   admindata: any;
  // this.admindata = {
  //   username: 'haderkhaled',
  //   firstName: 'khaled',
  //   lastName: 'khaled',
  //   email: 'hader@ample.com',
  //   password: 'password1234',
  //   repassword: 'password1234',
  //   role: 'admin',
  // };
  // onSubmit(form: any) {
  //   if (!form.valid) {
  //     alert('Please fill all the fields');
  //     return;
  //   } else {
  //     // Move the following part inside the else block to access admindata and token
  //     this.http.addAdmin(this.admindata, this.token).subscribe(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.error('Error adding admin:', error);
  //       }
  //     );
  //   }
  // }

// ---------------------- end add admin --------------------------- \\
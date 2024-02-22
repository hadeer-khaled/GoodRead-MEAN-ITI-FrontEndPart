import { Component, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from '../../interfaces/admins';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  //@viewChild('loginForm') loginForm:NgForm

  logObj!: Admins;
  allAdmis: Admins[] = [];
  errorMessage = null;
  token: string = '';
  admindata: any;

  constructor(private router: Router, private http: AdminService) {
    this.logObj = {
      username: '',
      password: '',
      role: 'admin',
    };
    this.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTNhM2E4Njk4MDgyZjcxNmMwZDE2IiwidXNlcm5hbWUiOiJub291ciIsImZpcnN0TmFtZSI6Im5vdXIiLCJsYXN0TmFtZSI6IlRhcmVrIiwiZW1haWwiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJfX3YiOjB9LCJpYXQiOjE3MDg1OTg2NTZ9.ImHWrsLWSeMohEiGD-pIBWsCGzge9KMB98JeFXH2JWQ';
    this.admindata = {
      username: 'haderkhaled',
      firstName: 'khaled',
      lastName: 'khaled',
      email: 'hader@ample.com',
      password: 'password1234',
      repassword: 'password1234',
      role: 'admin',
    };
  }

  /*ngOnInit(){
    this.http.fetchall().subscribe(admins =>{
      this.allAdmis = admins;
      console.log(this.allAdmis)
  }, error =>{
    this.errorMessage = error.error
    console.log(this.errorMessage)
  })
}*/

  /*
  onSubmit(form:any){
    if (!form.valid){
      alert("Please fill all the fields");
      return;
    }
    else{
      // // lohin logic ///
  const credentials = {username: this.logObj.username, password: this.logObj.password };
  this.http.login(credentials).subscribe(response => {
    console.log('User logged in successfully:', response);
    localStorage.setItem('token', JSON.stringify(response.data));
    console.log(localStorage.getItem('token'));
  }, error => {
    console.error('Error logging in:', error);
  });
    }
  }
*/
  onSubmit(form: any) {
    if (!form.valid) {
      alert('Please fill all the fields');
      return;
    } else {
      // Move the following part inside the else block to access admindata and token
      this.http.addAdmin(this.admindata, this.token).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error adding admin:', error);
        }
      );
    }
  }
}

/*
addAdmin() {
  const adminData = { username: 'admin', password: 'admin123' };
  this.adminService.addAdmin(adminData).subscribe(response => {
    console.log('Admin added successfully:', response);
  }, error => {
    console.error('Error adding admin:', error);
  });
}

login() {
  const credentials = { username: 'user', password: 'password' };
  this.adminService.login(credentials).subscribe(response => {
    console.log('User logged in successfully:', response);
  }, error => {
    console.error('Error logging in:', error);
  });
}
*/

/*
      //
      
          localStorage.setItem('loggedUser', JSON.stringify(res));


   else{
      this.service.login(this.logObj).subscribe(res =>{
        localStorage.setItem('loggedUser', JSON.stringify(res));
        //this.router.navigate('/dashBoard');
      })
      this.router.navigate('dashBoard');
    }
    this.service.login(this.logObj).subscribe(res =>{
      localStorage.setItem('loggedUser', JSON.stringify(res));
      this.router.navigate('/dashBoard');

    
  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const { username, password } = loginForm.value; // Get username and password from the form
      this.service.login(username, password).subscribe({
        next: () => {
          console.log('Login successful'); // Handle successful login
          // Redirect to the desired page after successful login if needed
        },
        error: (error) => {
          console.error('Login failed:', error); // Handle login error
          // Optionally display an error message to the user
        }
      });
    }
  }

  handleLogin(form:any){
    if (!form.valid){
      alert("Please fill all the fields");
      return;
    }
    else{
      console.log(form)
      console.log(this.logObj);
    }
*/

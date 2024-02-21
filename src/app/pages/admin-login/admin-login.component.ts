import { Component, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from '../../interfaces/admins';
import {LoginService} from '../../services/login.service'


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
  
export class AdminLoginComponent {
  //@viewChild('loginForm') loginForm:NgForm
 
  logObj !: Admins
  allAdmis : Admins[] = []
   errorMessage = null

  constructor(private router: Router , private http: LoginService ){
    this.logObj = {
      username: "",
      password: "",
      role:"admin",
    }
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

  onSubmit(form:any){
    if (!form.valid){
      alert("Please fill all the fields");
      return;
    }
    else{
      this.http.login(this.logObj).subscribe(res =>{
        console.log(res)
      },
      error =>{
        this.errorMessage = error.error
        console.log(this.errorMessage)
      })
    }
   
  
  }
  
}
   
    


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



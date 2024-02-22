import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../services/login.service'

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  logObj !: any
   errorMessage = null
   constructor(private router: Router , private http: LoginService ){
     this.logObj = {
       username: "",
       password: "",
       role:"user",
     }
   }

   onSubmit(form:any){
    if (!form.valid){
      alert("Please fill all the fields");
      return;
    }
    else{
      this.http.login(this.logObj).subscribe((res: any) =>{
        console.log(res)
      },
        (error: { error: null; }) =>{
        this.errorMessage = error.error
        console.log(this.errorMessage)
      })
    }
   
  
  }
  
}



  

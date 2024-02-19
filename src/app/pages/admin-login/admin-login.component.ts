import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
 
  logObj !: Admins

  constructor(private router: Router , private service: LoginService) { 

    this.logObj = {
      username: "",
      password: "",
      role:"admin"
    }

  }

  handleLogin(form:any){
    this.service.login(this.logObj).subscribe(res =>{
      //localStorage.setItem('loggedUser', JSON.stringify(res));
     //this.router.navigate('/dashBoard');
    })

  }
}


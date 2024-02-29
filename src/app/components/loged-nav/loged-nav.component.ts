import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loged-nav',
  standalone: true,
  imports: [],
  templateUrl: './loged-nav.component.html',
  styleUrl: './loged-nav.component.css'
})
export class LogedNavComponent {
  collapsed = true;
  AdminLogged = localStorage.getItem('AdminLogged')

  constructor(private router: Router) { }
  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('AdminLogged')
    console.log(localStorage.getItem('AdminLogged'))
    this.AdminLogged = null
    this.router.navigate(['/'])
    
  }

}

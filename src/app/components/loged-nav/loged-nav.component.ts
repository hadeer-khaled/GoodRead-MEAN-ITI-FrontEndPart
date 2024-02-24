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
  loggedAdmin = localStorage.getItem('loggedUser')

  constructor(private router: Router) { }
  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('loggedUser')
    console.log(localStorage.getItem('loggedUser'))
    this.loggedAdmin = null
    this.router.navigate(['/'])
    
  }

}

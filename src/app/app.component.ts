import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,/* AdminLoginComponent */ NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}

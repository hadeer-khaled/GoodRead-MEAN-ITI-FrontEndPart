import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
// import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project';
}

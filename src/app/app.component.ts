import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
// import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DeleteConfirmComponent } from './components/popUpComponents/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , DeleteConfirmComponent /* AdminLoginComponent,NavBarComponent*/],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}

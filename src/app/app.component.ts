import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , AdminLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}

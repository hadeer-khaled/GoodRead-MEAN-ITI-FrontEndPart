import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-control-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AdminNavbarComponent],
  templateUrl: './admin-control-page.component.html',
  styleUrl: './admin-control-page.component.css',
})
export class AdminControlPageComponent {}

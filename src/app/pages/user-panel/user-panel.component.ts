import { Component } from '@angular/core';
import { UserSideNavComponent } from '../../components/userPageComponents/user-side-nav/user-side-nav.component';
import { UserBooksComponent } from '../../components/userPageComponents/user-books/user-books.component';
import { UserNavBarComponent } from '../../components/user-nav-bar/user-nav-bar.component';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [UserSideNavComponent, UserBooksComponent, UserNavBarComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
})
export class UserPanelComponent {}

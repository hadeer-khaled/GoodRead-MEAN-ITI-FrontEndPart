import { Component } from '@angular/core';
import { UserSideNavComponent } from '../../components/userPageComponents/Home/user-side-nav/user-side-nav.component';
import { UserBooksComponent } from '../../components/userPageComponents/Home/user-books/user-books.component';
import { UserNavBarComponent } from '../../components/userPageComponents/user-nav-bar/user-nav-bar.component';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [UserSideNavComponent, UserBooksComponent, UserNavBarComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
})
export class UserPanelComponent {}

import { Component } from '@angular/core';

import { LandingComponent } from '../../components/landing/landing.component';
import { NavBarComponent } from '../../components/mainPageComponents/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PopularBooksComponent } from '../../components/mainPageComponents/popular-books/popular-books.component';
import { PopularAuthorsComponent } from '../../components/mainPageComponents/popular-authors/popular-authors.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NavBarComponent,
    LandingComponent,
    PopularBooksComponent,
    PopularAuthorsComponent,
    FooterComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}

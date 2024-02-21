import { Component } from '@angular/core';

import { LandingComponent } from '../../components/landing/landing.component';
import { NavBarComponent } from '../../components/mainPageComponents/nav-bar/nav-bar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavBarComponent, LandingComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}

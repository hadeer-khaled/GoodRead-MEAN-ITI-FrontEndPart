import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catergory-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './catergory-card.component.html',
  styleUrl: './catergory-card.component.css'
})
export class CategoryCardComponent {
  @Input() categoryItem: any;
  constructor(private router : Router){}
  redirectToDetails(_id: string) {
    this.router.navigate(['category-details', _id, 1]); 
  }
}

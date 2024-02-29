import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CategoryCardComponent } from '../catergory-card/catergory-card.component.js';
import { CategoryService } from '../../services/category.service.js';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryCardComponent, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories: any[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAllcategoriesNames('categoriesName').subscribe(
      (data: any) => {
        console.log('categories:', data.categories);
        this.categories = data.categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}

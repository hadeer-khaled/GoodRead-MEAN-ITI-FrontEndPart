import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category-service.service';

@Component({
  selector: 'app-show-category-books-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './show-category-books-card.component.html',
  styleUrl: './show-category-books-card.component.css'
})
export class ShowCategoryBooksCardComponent {
  category: any = {};
  books: any[] = [];
  @Input() id: string = "";

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    const pageNum = 1;
    this.categoryService.getCategoryById(this.id, pageNum).subscribe(
      (data: any) => {
        console.log('category:', data.categories.category);
        console.log('books:', data.categories.books);
        this.category = data.categories.category;
        this.books = data.categories.books;
      },
      (error) => {
        console.error('Error fetching category details:', error);
      }
    );
  }
}

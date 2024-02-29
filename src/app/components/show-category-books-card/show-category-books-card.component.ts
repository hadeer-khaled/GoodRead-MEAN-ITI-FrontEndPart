import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../services/category.service.js';
@Component({
  selector: 'app-show-category-books-card',
  standalone: true,
  imports: [NgIf, NgFor,NgbPaginationModule],
  templateUrl: './show-category-books-card.component.html',
  styleUrl: './show-category-books-card.component.css'
})
export class ShowCategoryBooksCardComponent {
  @Input() id: string = "";
  category: any = {};
  books: any[] = [];
  token: string = '';
  pageSize = 4;
  page = 1;
  booksCount!: number;

  constructor(private categoryService: CategoryService,private router:Router ) {}

  ngOnInit() {

this.getCategoryBooks()
}

onPageChange() {
this.getCategoryBooks()
  }


getCategoryBooks(){
  this.token = localStorage.getItem('token') || ''
  this.categoryService.getCategoryById(this.id, this.page,this.pageSize,this.token).subscribe(
    (data: any) => {
      console.log('get data : ',data);
      console.log('data.categories',data.categories);
      console.log('data.categories.booksCount',data.categories.booksCount);
      this.category = data.categories.categoryName;
      this.booksCount = data.categories.booksCount;
      this.books = data.categories.paginatedBooks;
      this.router.navigate(['category-details',this.id,this.page,data.categories.paginatedBooks.length]); 
    },
    (error) => {
      console.error('Error fetching category details:', error);
    }
  );
}
}
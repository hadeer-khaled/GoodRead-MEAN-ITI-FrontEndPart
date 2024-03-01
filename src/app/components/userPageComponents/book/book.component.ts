import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/book.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserNavBarComponent } from '../../user-nav-bar/user-nav-bar.component.js';
import { StorageService } from '../../../services/storage-service.service';
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,  NgbPaginationModule,UserNavBarComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  books!: any[]; 
  currentPage: number = 1;
  length!:number;
  pageSize:number=5;
  page:number=1
  token:string='';

  constructor(private bookService: BookService,
    private storageService: StorageService
){
   
  }
  ngOnInit(): void {
    const queryParams = { pageNum: 1 }; 
    this.token = this.storageService.getItem('token') || '';
    this.bookService.getUserBooks(queryParams, this.token)
    .subscribe((data:any) => {
      this.books = data.books;
      console.log('bboks ----------------- ',this.books)
      console.log('authorID--------------',this.books[0].author._id)
      this.length=data.bookCount;
      console.log(this.length=data.bookCount);
      }, (error) => {
        console.error('Error fetching books:', error);
      });
  }
  

onPageChange(pageNumber: number){
  this.token = this.storageService.getItem('token') || '';

  this.currentPage = pageNumber; 
  const queryParams = { pageNum: pageNumber }; 
  console.log(queryParams);
  this.bookService.getUserBooks(queryParams, this.token)
    .subscribe(
      (data:any) => {
        this.books = data.books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
}
}

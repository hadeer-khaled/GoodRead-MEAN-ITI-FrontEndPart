import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../book.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,  NgbPaginationModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  books!: any[]; 
  currentPage: number = 1;
  length!:number;
  pageSize:number=5;
  page:number=1
  constructor(private bookService: BookService){
   
  }
  ngOnInit(): void {
    const queryParams = { pageNum: 1 }; 
    const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTJmYmI0MWMzZDg4OWJlYjRmN2QyIiwidXNlcm5hbWUiOiJub3VyIiwiZmlyc3ROYW1lIjoiYWx4aSIsImxhc3ROYW1lIjoiVGFyZWtrIiwiZW1haWwiOiJhbHNra2lAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMjBUMjM6MDM6MjMuMzA1WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMjBUMjM6MDM6MjMuMzA1WiIsIl9fdiI6MH0sImlhdCI6MTcwODYyOTM2M30.48MxSfSnOy91SzUPPqICTl_EoASigAm75tNA7wR7FHg";
    this.bookService.getUserBooks(queryParams, token)
    .subscribe((data:any) => {
      this.books = data.books;
      this.length=data.bookCount;
      console.log(this.length=data.bookCount);
      }, (error) => {
        console.error('Error fetching books:', error);
      });
  }
  

onPageChange(pageNumber: number){
  this.currentPage = pageNumber; 
  const queryParams = { pageNum: pageNumber }; 
  console.log(queryParams);
  const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTJmYmI0MWMzZDg4OWJlYjRmN2QyIiwidXNlcm5hbWUiOiJub3VyIiwiZmlyc3ROYW1lIjoiYWx4aSIsImxhc3ROYW1lIjoiVGFyZWtrIiwiZW1haWwiOiJhbHNra2lAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMjBUMjM6MDM6MjMuMzA1WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMjBUMjM6MDM6MjMuMzA1WiIsIl9fdiI6MH0sImlhdCI6MTcwODYyOTM2M30.48MxSfSnOy91SzUPPqICTl_EoASigAm75tNA7wR7FHg";
  this.bookService.getUserBooks(queryParams, token)
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

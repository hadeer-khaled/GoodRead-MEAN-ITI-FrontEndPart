import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../book.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CurrencyPipe,FormsModule,RouterLink,RouterLinkActive, NgbDropdownModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  userRating: number = 3; // Default rating is 3
  book!:Book;
  shelve:string="want to read";
  averageRating?: number;
  @Input() id:string="";

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    const queryParams = { pageNum: 1 }; 
    console.log(this.id);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkZjJjMGRiNGI4ZGZiMTFmZmIyNWFiIiwidXNlcm5hbWUiOiJhbGFhU2hlcmZpIiwiZmlyc3ROYW1lIjoiZW1hZCIsImxhc3ROYW1lIjoic2hlcmlmIiwiZW1haWwiOiJhbGFhQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJib29rcyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsImlkIjoxLCJfX3YiOjB9LCJpYXQiOjE3MDkxMzQ4ODh9.B_LwrIWFn581LkPoKMvfWIXr0igR4eUc3GOr62BKasg";
    this.bookService.getBookByIdUser(this.id, token)
      .subscribe((data) => {
        this.book = data;
        console.log("i'm here ");
        console.log(this.book);
        console.log(this.book.totalRating);
        console.log(this.book.countOfRating);
        if (this.book.countOfRating == 0) {
          this.averageRating = 0
        } else{
          this.averageRating = this.book.totalRating / this.book.countOfRating;
        }

      }, (error) => {
        console.error('Error fetching books:', error);
      });
     
  }
    //////////////////updateBookShelve//////////////////////
    onDropdownItemClicked(value: string) {
    // update the sheleve in db 
     this.shelve=value;
      console.log('Selected value:', value);
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkZjJjMGRiNGI4ZGZiMTFmZmIyNWFiIiwidXNlcm5hbWUiOiJhbGFhU2hlcmZpIiwiZmlyc3ROYW1lIjoiZW1hZCIsImxhc3ROYW1lIjoic2hlcmlmIiwiZW1haWwiOiJhbGFhQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJib29rcyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsImlkIjoxLCJfX3YiOjB9LCJpYXQiOjE3MDkxMzQ4ODh9.B_LwrIWFn581LkPoKMvfWIXr0igR4eUc3GOr62BKasg";
      this.bookService.updateBookShelve(this.book._id,value, token)
      .subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.error('Error fetching books:', error);
      });
    }
    //////////////////updateBookRating//////////////////////
  onRatingChange(rating: number) {
      this.userRating = rating;
      console.log(`the id ${this.book}`);
      console.log(this.userRating);
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkZjJjMGRiNGI4ZGZiMTFmZmIyNWFiIiwidXNlcm5hbWUiOiJhbGFhU2hlcmZpIiwiZmlyc3ROYW1lIjoiZW1hZCIsImxhc3ROYW1lIjoic2hlcmlmIiwiZW1haWwiOiJhbGFhQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJib29rcyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsImlkIjoxLCJfX3YiOjB9LCJpYXQiOjE3MDkxMzQ4ODh9.B_LwrIWFn581LkPoKMvfWIXr0igR4eUc3GOr62BKasg";
      this.bookService.updateBookRating(this.book._id,this.userRating, token)
      .subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.error('Error fetching books:', error);
      });
     
    }
}

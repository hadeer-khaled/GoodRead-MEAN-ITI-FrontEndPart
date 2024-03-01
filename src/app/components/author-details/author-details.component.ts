import { Author } from './../../interfaces/author';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { UserNavBarComponent } from '../user-nav-bar/user-nav-bar.component.js';
import { log } from 'console';
import { BookService } from '../../book.service.js';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [UserNavBarComponent,RouterLink,NgbRating],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  userRating: number = 3;
  shelve: string = 'want to read';
  averageRating?: number;
  readonly = true;
  author:any
  book:any;
  books:any[] = [];
  @Input() id : string ='' 
  name ?: string = ''
  token:string='';
  constructor( private http:AuthorService ,private bookService:BookService){
    this.token =localStorage.getItem('token')||''
       
  }

  ngOnInit(){
    this.http.getAuthorById(this.id).subscribe( (data:any) => {
      this.author = data.authorDetails[0].author;
      console.log(data);
      this.books = data.authorBooks;
      console.log('author books',data.authorBooks);
    },
    (error) => {
      console.error('Error fetching books:', error);
    }
  );
  }



  ///////////////////get rate form user books array/////////////////////
  getRating(books: any[], bookId: string): number | undefined {
    const foundBook = books.find((book) => book.idOfBook === bookId);
    return foundBook ? foundBook.rating : undefined;
  }
  //////////////////updateBookShelve//////////////////////
  onDropdownItemClicked(value: string) {
    // update the sheleve in db
    this.shelve = value;
    console.log('Selected value:', value);
    this.bookService.updateBookShelve(this.book._id, value, this.token).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  //////////////////updateBookRating//////////////////////
  onRatingChange(rating: number) {
    this.userRating = rating;
    console.log(`the id ${this.book}`);
    console.log(this.userRating);
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkZjJjMGRiNGI4ZGZiMTFmZmIyNWFiIiwidXNlcm5hbWUiOiJhbGFhU2hlcmZpIiwiZmlyc3ROYW1lIjoiZW1hZCIsImxhc3ROYW1lIjoic2hlcmlmIiwiZW1haWwiOiJhbGFhQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJib29rcyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMjhUMTI6NTA6MjEuMTQ5WiIsImlkIjoxLCJfX3YiOjB9LCJpYXQiOjE3MDkxMzQ4ODh9.B_LwrIWFn581LkPoKMvfWIXr0igR4eUc3GOr62BKasg';
    this.bookService
      .updateBookRating(this.book._id, this.userRating, token)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }
  calculateAverageRating(totalRating: number, countOfRating: number): number {
    if (countOfRating === 0) {
      return 0;
    }

    return Number(totalRating) / Number(countOfRating);
  }
 
}

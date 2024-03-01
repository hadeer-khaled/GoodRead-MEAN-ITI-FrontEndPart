import { Author } from './../../interfaces/author';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { UserNavBarComponent } from '../user-nav-bar/user-nav-bar.component.js';
import { BookService } from '../../book.service.js';
import { NgbDropdownModule, NgbRating, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [UserNavBarComponent,RouterLink, NgbDropdownModule,NgbRatingModule],
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



  this.bookService.getBookByIdUser(this.id, this.token).subscribe(
    (data) => {
      this.book = data;
      console.log(this.book);
      console.log("i'm here ");
      if (this.book.countOfRating == 0) {
        this.averageRating = 0;
      } else {
        this.averageRating = this.book.totalRating / this.book.countOfRating;
      }
    },
    (error) => {
      console.error('Error fetching books:', error);
    }
  );
  console.log("i'm here ");
  console.log('im am her on afeer first method init');
 
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
    this.token = localStorage.getItem('token') || '';
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
    this.token = localStorage.getItem('token') || '';
    this.bookService
      .updateBookRating(this.book._id, this.userRating, this.token)
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

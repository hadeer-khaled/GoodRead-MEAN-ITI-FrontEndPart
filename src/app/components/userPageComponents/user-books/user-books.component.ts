import {
  Component,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../book.service';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-books',
  standalone: true,
  imports: [NgbRatingModule, NgbPaginationModule],
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.css',
  // changeDetection: ChangeDetectionStrategy.Default, // or ChangeDetectionStrategy.OnPush if you're using it
})
export class UserBooksComponent {
  books!: Array<Book>;
  userBooks$!: any;
  shelve!: string;
  selected = 6;
  readonly = true;
  pageSize = 9;
  page = 1;
  // private differ: KeyValueDiffer<any, any>;
  constructor(
    private bookService: BookService // private cdr: ChangeDetectorRef, // private differs: KeyValueDiffers
  ) {
    // this.differ = differs.find({}).create();
  }
  ngOnInit(): void {
    // this.shelve = this.bookService.getShelve();
    // this.getBooksFilterByShelf(this.shelve);

    this.userBooks$ = this.bookService.getBooksFilterByShelf(this.shelve);
    this.bookService.getShelve().subscribe((shelve) => {
      this.shelve = shelve;
      this.getUsersBooks(shelve);
    });
  }

  // ================================ Get Books  filtered by shelve =============== \\
  getUsersBooks(shelve: string) {
    if (shelve == 'all') {
      this.bookService.getBooks().subscribe(
        (response: any) => {
          console.log('Subscribe response', response);
          this.books = response;
          console.log('this.books', this.books);
        },
        (error: any) => {
          console.error('Error getting books:', error);
        }
      );
    } else {
      console.log('Not All Shelve , Selected ===> ', shelve);
      // this.bookService.getBooksFilterByShelf(shelve).subscribe(
      //   (response: any) => {
      //     console.log('Subscribe response', response);
      //     this.books = response;
      //     console.log('this.books', this.books);
      //   },
      //   (error: any) => {
      //     console.error('Error getting books:', error);
      //   }
      // );
    }
  }
}

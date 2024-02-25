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
})
export class UserBooksComponent {
  books!: Array<Book>;
  userBooks$!: any;
  shelve!: string;
  selected = 1;
  readonly = true;
  pageSize = 8;
  page = 1;
  pagedBooksList!: Array<Book>;
  constructor(private bookService: BookService) {}
  ngOnInit(): void {
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
          this.updatePagedBooks();
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
  onPageChange() {
    this.updatePagedBooks();
  }
  updatePagedBooks() {
    // Call pagedBooks() to update the displayed books based on pagination logic
    this.pagedBooksList = this.pagedBooks();
  }
  pagedBooks(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.books.slice(startIndex, endIndex);
  }
}

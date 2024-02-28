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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-books',
  standalone: true,
  imports: [NgbRatingModule, NgbPaginationModule, FormsModule, CommonModule],
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.css',
})
export class UserBooksComponent {
  books!: Array<Book>;
  userBooks$!: any;
  shelve!: string;
  selected = 1;
  readonly = true;

  shelveOptions = ['all', 'read', 'reading', 'want'];
  selectedShelve: string[] = [];
  pageSize = 2;
  page = 1;
  booksLength!: number;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // ====================== Try New one ================

    this.bookService.getShelve().subscribe((shelve) => {
      this.shelve = shelve;
      this.getUsersBooks(shelve);
    });

    // ====================== Old working one ================
    // this.userBooks$ = this.bookService.getBooksFilterByShelf( this.page );

    // console.log(this.collectionSize);

    // this.bookService.getShelve().subscribe((shelve) => {
    //   this.shelve = shelve;
    //   this.getUsersBooks(shelve);
    // });
  }

  // ================================ Get Books  filtered by shelve =============== \\

  getUsersBooks(shelve: string) {
    this.bookService.getBooksFilterByShelf(this.page, shelve).subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.books = response.books;
        console.log('this.books', this.books);
        this.booksLength = response.count;
        console.log('this.booksLength', this.booksLength);
        console.log('Inside book component, Selected ===> ', shelve);

        console.log('selectedShelve Array ', this.selectedShelve);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }
  onPageChange() {
    this.bookService.getShelve().subscribe((shelve) => {
      this.shelve = shelve;
      // this.selectedShelve = shelve;
      this.getUsersBooks(shelve);
    });
  }

  // ====================== Old working one ================
  // getUsersBooks(shelve: string) {
  //   if (shelve == 'all') {
  //     this.bookService.getBooks().subscribe(
  //       (response: any) => {
  //         console.log('Subscribe response', response);
  //         this.books = response;
  //         this.updatePagedBooks();
  //         console.log('this.books', this.books);
  //       },
  //       (error: any) => {
  //         console.error('Error getting books:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Not All Shelve , Selected ===> ', shelve);
  //     // this.bookService.getBooksFilterByShelf(shelve).subscribe(
  //     //   (response: any) => {
  //     //     console.log('Subscribe response', response);
  //     //     this.books = response;
  //     //     console.log('this.books', this.books);
  //     //   },
  //     //   (error: any) => {
  //     //     console.error('Error getting books:', error);
  //     //   }
  //     // );
  //   }
  // }

  // onPageChange() {
  //   this.updatePagedBooks();
  // }
  // updatePagedBooks() {
  //   // Call pagedBooks() to update the displayed books based on pagination logic
  //   this.pagedBooksList = this.pagedBooks();
  // }

  // pagedBooks(): any[] {
  //   const startIndex = (this.page - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   return this.books.slice(startIndex, endIndex);
  // }
}

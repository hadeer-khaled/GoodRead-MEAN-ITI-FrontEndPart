import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

import { map } from 'rxjs/operators';
import { Book } from '../../../interfaces/book';
import { Author } from '../../../interfaces/author';
import { Category } from '../../../interfaces/category';
import { BookService } from '../../../book.service';
import { AuthorService } from '../../../services/author.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css',
})
export class BooksTableComponent {
  categories!: Array<Category>;
  authors!: Array<Author>;
  books!: Array<Book>;

  editBookForm!: FormGroup;
  id!: number;
  selectedBook!: any;
  bookForm!: FormGroup;
  newBook: any;
  categoriesArray2: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    // private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {
    this.bookForm = new FormGroup({
      newBookName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      newBookCategoryID: new FormControl('', [Validators.required]),
      newAuthorID: new FormControl('', [Validators.required]),
    });

    this.editBookForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      editbookCategoryID: new FormControl('', [Validators.required]),
      editbookauthorID: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllAuthors();
    this.getAllCategories();
  }
  // ================================ Get All Books =============== \\
  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.books = response;
        console.log('this.books', this.books);
        console.log('this.categories', this.categories);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }
  // ================================ Add book =============== \\
  getNewBookName() {
    this.newBook = {
      title: this.bookForm.value.newBookName,
      // category: this.categoryService.getCategoryById(
      //   this.bookForm.value.newBookCategoryID
      // ),
      category: this.bookForm.value.newBookCategoryID,
      author: this.bookForm.value.newAuthorID,
    };
    console.log('this.newBook: ', this.newBook);
    this.bookService.createBook(this.newBook).subscribe(
      (response) => {
        console.log('Book added successfully:', response);

        this.getAllBooks();
        // window.location.reload();
      },
      (error) => {
        console.error('Error adding Book:', error);
      }
    );
  }
  // ================================ Get All Authors =================== \\

  getAllAuthors() {
    this.authorService.getAuthors().subscribe(
      (response: any) => {
        console.log('Subscribe response', response);
        this.authors = response;
        console.log('this.authors', this.authors);
      },
      (error: any) => {
        console.error('Error getting books:', error);
      }
    );
  }
  // ================================ Get All Categries =================== \\
  getAllCategories() {
    const pageNum = 1; // Or any page number you want to fetch
    this.categoryService
      .getcategoriesNames()
      .pipe(
        map((data: any) => {
          console.log('data', data);
          let categoriesArray = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              console.log('data[key]', data[key]);
              categoriesArray = data[key];
            }
          }
          return categoriesArray;
        })
      )
      .subscribe(
        (categories) => {
          this.categories = categories;
          console.log('this.categories', this.categories);
        },
        (error) => {
          console.error('Error getting categories:', error);
        }
      );
  }

  // --------------------------- NgBootstrap Code --------------------------- \\
  closeResult = '';
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  // ================================ edit ngModal ================================

  editBook(book: any, editModal: any) {
    console.log('Editing book:', book);
    this.id = book.id;
    console.log(this.id);
    this.editBookForm.patchValue({
      title: book.title,
      // editbookCategoryID: book.category.name,
      editbookauthorID: book.author.firstName + ' ' + book.author.lastName,
    });
    this.modalService.open(editModal, { centered: true });
  }
  // ================================ edit  ================================

  updatebook() {
    this.bookService
      .updateBook(
        this.id,
        this.editBookForm.value,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTNhM2E4Njk4MDgyZjcxNmMwZDE2IiwidXNlcm5hbWUiOiJub291ciIsImZpcnN0TmFtZSI6Im5vdXIiLCJsYXN0TmFtZSI6IlRhcmVrIiwiZW1haWwiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJfX3YiOjB9LCJpYXQiOjE3MDg3NDczNDh9.zqZU7dvGn9r4td2CJqF_Rkz5Mc_dcHf38brAT4J6vpo'
      )
      .subscribe(
        (response) => {
          console.log('Book updated successfully:', response);
          this.getAllBooks();
          // window.location.reload();
        },
        (error) => {
          console.error('Error updating Book:', error);
        }
      );
    this.modalService.dismissAll();
  }

  // ================================ delete ngModal ================================

  deleteBookModal(book: any, content: any) {
    this.id = book.id;
    this.modalService.open(content, { centered: true });
  }

  // ================================ delete  ================================

  deleteBook() {
    this.bookService.deleteBook(this.id, 'string').subscribe(
      (response) => {
        console.log('Book deleted successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting Book:', error);
      }
    );
    this.modalService.dismissAll();
  }
}

import { Books } from '../../../../../Books.json';
import { Categories } from '../../../../../Categories.json';
import { Authors } from '../../../../../Authors.json';
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

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css',
})
export class BooksTableComponent {
  categories: any = Categories;
  Authors: any = Authors;
  books: any = Books;
  editBookForm!: FormGroup;
  editedBookId!: number;
  selectedBook!: any
  bookForm!: FormGroup;

  constructor(private router: Router,
      private dataService: DataService,
      private formBuilder: FormBuilder,
      private modalService: NgbModal 
      ) {
    this.bookForm = new FormGroup({
      newBookName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      newBookCategoryID: new FormControl('', [Validators.required]),
      newAuthorID: new FormControl('', [Validators.required]),
    });

    this.editBookForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      categoryID: new FormControl('', 
        [Validators.required,
      Validators.pattern('^[0-9]*$')]),
      authorID: new FormControl('', 
        [Validators.required,
      Validators.pattern('^[0-9]*$')]),
    });
  }
  getNewBookName() {
    this.books.push({
      bookID: this.books[Number(this.books.length - 1)].bookID + 1,
      title: this.bookForm.value.newBookName,
      categoryID: this.bookForm.value.newBookCategoryID,
      authorID: this.bookForm.value.newAuthorID,
    });
    console.log(this.bookForm.value);
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
    // ------------ edit ngModal --------------//
    editBook(book: any, editModal: any) {
      console.log('Editing book:', book);
      this.editedBookId = book.bookID;
      this.selectedBook = { 
        title: book.title,
        categoryID: book.categoryID,
        authorID: book.authorID
      };
      console.log('Selected book:', this.selectedBook);
      this.populateForm();
      this.modalService.open(editModal, { centered: true });
    }
    
    populateForm() {
      console.log('Selected book for form population:', this.selectedBook);
      this.editBookForm.patchValue({
        title: this.selectedBook.title,
        categoryID: this.selectedBook.categoryID,
        authorID: this.selectedBook.authorID,
      });
    }
    updateBook() {
      const isvalid = this.editBookForm.valid
      if (isvalid) {
        const isUpdated = this.dataService.updateBook(this.editedBookId, this.selectedBook);
        if (isUpdated) {
          this.modalService.dismissAll();
          this.router.navigate(['/admin/books']);
        }
      }
      else {
        console.log('Form is not valid');
      }
      console.log(this.editBookForm.value);
    }
   
    // ---------- delete ------------//
    delete(id: number){
      this.books = this.books.filter((book : any) => book.bookID !== id)
    }
}

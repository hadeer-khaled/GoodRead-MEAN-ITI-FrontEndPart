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
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  bookForm!: FormGroup;
  constructor(private router: Router) {
    this.bookForm = new FormGroup({
      newBookName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      newBookCategoryID: new FormControl('', [Validators.required]),
      newAuthorID: new FormControl('', [Validators.required]),
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
  private modalService = inject(NgbModal);
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
}

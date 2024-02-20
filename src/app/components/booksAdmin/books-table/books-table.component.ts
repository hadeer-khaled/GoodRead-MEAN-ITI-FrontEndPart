import { Books } from '../../../../../Books.json';
import { Categories } from '../../../../../Categories.json';
import { Authors } from '../../../../../Authors.json';
import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css',
})
export class BooksTableComponent {
  categories: any = Categories;
  Authors: any = Authors;
  books: any = Books;
  newBookName: string = '';
  newBookCategoryID: string = '';
  newAuthorID: string = '';

  ngOnInit() {
    // console.log('books', this.books);
  }
  getNewBookName() {
    this.books.push({
      bookID: this.books[Number(this.books.length - 1)].bookID + 1,
      title: this.newBookName,
      categoryID: this.newBookCategoryID,
      authorID: this.newAuthorID,
    });
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

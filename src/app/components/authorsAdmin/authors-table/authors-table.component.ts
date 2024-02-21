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
  selector: 'app-authors-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './authors-table.component.html',
  styleUrl: './authors-table.component.css',
})
export class AuthorsTableComponent {
  authors: any = Authors;

  authorForm!: FormGroup;
  constructor(private router: Router) {
    this.authorForm = new FormGroup({
      newFirstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      newLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      newDob: new FormControl('', [Validators.required]),
    });
  }
  getNewAuthorName() {
    this.authors.push({
      authorID: this.authors[Number(this.authors.length - 1)].authorID + 1,
      firstName: this.authorForm.value.newFirstName,
      lastName: this.authorForm.value.newLastName,
      dob: this.authorForm.value.newDob,
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

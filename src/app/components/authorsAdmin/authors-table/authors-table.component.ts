import { Author } from '../../../interfaces/author';

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
import { AuthorService } from '../../../services/author.service';
@Component({
  selector: 'app-authors-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './authors-table.component.html',
  styleUrl: './authors-table.component.css',
})
export class AuthorsTableComponent {
  authors!: Array<Author>;
  newAuthors: any;

  authorForm!: FormGroup;
  constructor(private router: Router, private authorService: AuthorService) {
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
  ngOnInit(): void {
    this.getAllAuthors();
  }

  // ================= Get All Authors =================== \\
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
  // ================= Add New Author =================== \\
  getNewAuthorName() {
    this.newAuthors = {
      firstName: this.authorForm.value.newFirstName,
      lastName: this.authorForm.value.newLastName,
      dob: this.authorForm.value.newDob,
    };
    this.authorService.createAuthor(this.newAuthors).subscribe(
      (response) => {
        console.log('Author added successfully:', response);
        this.getAllAuthors();
        window.location.reload();
      },
      (error) => {
        console.error('Error adding Author:', error);
      }
    );
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

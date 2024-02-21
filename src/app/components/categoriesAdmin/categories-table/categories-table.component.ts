import { Categories } from '../../../../../Categories.json';
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
  selector: 'app-categories-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})
export class CategoriesTableComponent {
  categories: any = Categories;

  categoryForm!: FormGroup;
  constructor(private router: Router) {
    this.categoryForm = new FormGroup({
      newCategoryName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
    });
  }

  getNewCateogrName() {
    this.categories.push({
      id: this.categories[Number(this.categories.length - 1)].id + 1,
      categoryName: this.categoryForm.value.newCategoryName,
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

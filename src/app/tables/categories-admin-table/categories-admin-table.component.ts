import { Categories } from '../../../Categories.json';
import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-admin-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories-admin-table.component.html',
  styleUrl: './categories-admin-table.component.css',
})
export class CategoriesAdminTableComponent {
  categories: any = Categories;
  newCateoryName: string = '';

  ngOnInit() {
    console.log('Categories', this.categories);
  }
  getNewCateogrName() {
    this.categories.push({
      id: this.categories[Number(this.categories.length - 1)].id + 1,
      categoryName: this.newCateoryName,
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

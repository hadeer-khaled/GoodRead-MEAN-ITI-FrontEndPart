import { Categories } from '../../../../../Categories.json';
import { Component, inject, TemplateRef,ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
////////
//import { DeleteConfirmComponent } from '../../delete-confirm/delete-confirm.component';
// import { ModalService } from '../../../services/modal-service.service'
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule /*, DeleteConfirmComponent*/ ],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})
export class CategoriesTableComponent {

 

  categories: any = Categories;

  categoryForm!: FormGroup;

  editCategoryForm!: FormGroup;
  editedCategoryId!: number;
  ////
  constructor(private router: Router ,
      private dataService: DataService,
      private formBuilder: FormBuilder,
      private modalService: NgbModal 
    ) {
      
      this.categoryForm = new FormGroup({
        newCategoryName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      });

      this.editCategoryForm = this.formBuilder.group({
        editCategoryName: ['',
         [Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20)]]
      });
    
  }

  getNewCateogrName() {
    this.categories.push({
      id: this.categories[Number(this.categories.length - 1)].id + 1,
      categoryName: this.categoryForm.value.newCategoryName,
    });
  }

  // --------------------------- NgBootstrap Code --------------------------- \\
  //private modalService = inject(NgbModal);
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
editCategory(category: any, content: any) {
    this.editedCategoryId = category.id;
    this.editCategoryForm.patchValue({ editCategoryName: category.categoryName });
    this.modalService.open(content, { centered: true }); 
  }

  updateCategory() {
    const newName = this.editCategoryForm.get('editCategoryName')?.value;
    if (newName !== undefined && newName !== null) {
      this.dataService.updateCategory(this.editedCategoryId, newName);
    }
    this.modalService.dismissAll(); 
  }
  // ---------------- delete ---------------- //
  
    delete(id: number){
      this.categories = this.categories.filter((task : any) => task.id !== id)
    }
  
  
  
    /*
    ngOnInit(): void {
     // Subscribe to the showModal$ observable here
     this.modalService2.showModal$.subscribe((categoryId: number) => {
       // Handle the emitted category ID here
       this.openDeleteModal(categoryId);
     });
   }
   openDeleteModal(id : number) {
     this.modalService2.openModal(id);
   }
   
   confirmDeleteCategory(id : number) {
     this.categories = this.categories.filter((category : any) => category.id !== id)
     console.log('Category deleted');
   }


  openDialog(){
    this.modalService.open(DeleteConfirmComponent).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


*/
}
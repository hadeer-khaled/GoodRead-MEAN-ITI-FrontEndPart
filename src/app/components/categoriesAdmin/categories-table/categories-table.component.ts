import { Categories } from '../../../../../Categories.json';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators'
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
import { CategoryService } from '../../../category.service';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule /*, DeleteConfirmComponent*/],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})
export class CategoriesTableComponent {
  categoriesArray: any = [];
 
  token: string = '';

  categoryForm!: FormGroup;
  
  editCategoryForm!: FormGroup;
  editedCategoryId!: number;
  ////
  constructor(
  
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private categoryService: CategoryService
  ) {
    this.categoriesArray =[{id : 1 , name : "menna"} , {id : 2 , name : "Hadeer"} ]  ;
    this.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTNhM2E4Njk4MDgyZjcxNmMwZDE2IiwidXNlcm5hbWUiOiJub291ciIsImZpcnN0TmFtZSI6Im5vdXIiLCJsYXN0TmFtZSI6IlRhcmVrIiwiZW1haWwiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJfX3YiOjB9LCJpYXQiOjE3MDg1OTg2NTZ9.ImHWrsLWSeMohEiGD-pIBWsCGzge9KMB98JeFXH2JWQ';
    this.categoryForm = new FormGroup({
      newCategoryName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
    });

    this.editCategoryForm = this.formBuilder.group({
      editCategoryName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  
  ngOnInit(): void {
    console.log("Static Data",this.categoriesArray)
    this.getAllCategories()
  }


  // =============== Get All Cateogries ================== \\
  getAllCategories() {
    const pageNum = 2; // Or any page number you want to fetch
    this.categoryService.getAllCategories(pageNum , this.token).pipe( map((data: any) => {
      const categoriesArray = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          categoriesArray.push(data[key]);
        }
      }
      return categoriesArray;
    }))
    .subscribe(
      (categories) => {
        this.categoriesArray = categories;
        console.log("Our cateogries:" , this.categoriesArray)
        console.log('Categories:', categories);
        // Handle categories
      },
      (error) => {
        console.error('Error getting categories:', error);
        // Handle error
      }
    );
  }
 

  getNewCateogrName() {

    const categoryData = {
      name: this.categoryForm.value.newCategoryName,
    };
    this.categoryService.addCategory(categoryData, this.token).subscribe(
      (response) => {
        console.log('Category added successfully:', response);
        this.getAllCategories()
        // window.location.reload();
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }



//   updateCategory() {
//     const categoryId = 'category_id';
//     const categoryData = {
//       /* Updated category data */
//     };
//     this.categoryService.updateCategory(categoryId, categoryData).subscribe(
//       (response) => {
//         console.log('Category updated successfully:', response);
//         // Handle success
//       },
//       (error) => {
//         console.error('Error updating category:', error);
//         // Handle error
//       }
//     );
//   }

//   deleteCategory() {
//     const categoryId = 'category_id';
//     this.categoryService.deleteCategory(categoryId).subscribe(
//       (response) => {
//         console.log('Category deleted successfully:', response);
//         // Handle success
//       },
//       (error) => {
//         console.error('Error deleting category:', error);
//         // Handle error
//       }
//     );
//   }

//   getPopularCategories() {
//     this.categoryService.getPopularCategories().subscribe(
//       (categories) => {
//         console.log('Popular categories:', categories);
//         // Handle categories
//       },
//       (error) => {
//         console.error('Error getting popular categories:', error);
//         // Handle error
//       }
//     );
//   }



//   // --------------------------- NgBootstrap Code --------------------------- \\
//   //private modalService = inject(NgbModal);
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
//   // ------------ edit ngModal --------------//
  editCategory(category: any, content: any) {
    this.editedCategoryId = category.id;
    this.editCategoryForm.patchValue({
      editCategoryName: category.categoryName,
    });
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

  delete(id: number) {
    this.categoriesArray = this.categoriesArray.filter(
      (category: any) => category.id !== id
    );
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

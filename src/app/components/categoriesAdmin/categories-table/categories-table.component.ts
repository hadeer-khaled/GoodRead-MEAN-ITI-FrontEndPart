import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { CategoryService } from '../../../category.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  // FormsModule,
  Validators,
} from '@angular/forms';

// import { DataService } from '../../../services/data.service';
//import { DeleteConfirmComponent } from '../../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [ReactiveFormsModule, /*FormsModule , DeleteConfirmComponent*/],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})

//private dataService: DataService,
//private formBuilder: FormBuilder,

export class CategoriesTableComponent {
  categoriesArray: any = [];
  token: string = '';
  categoryForm!: FormGroup;
  editCategoryForm!: FormGroup;
  id!: number;
  
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private categoryService: CategoryService
    ) {
      
    this.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTNhM2E4Njk4MDgyZjcxNmMwZDE2IiwidXNlcm5hbWUiOiJub291ciIsImZpcnN0TmFtZSI6Im5vdXIiLCJsYXN0TmFtZSI6IlRhcmVrIiwiZW1haWwiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJfX3YiOjB9LCJpYXQiOjE3MDg2OTM1NDR9.sLQelU4uZlAQahwmWCfupCa4YzVH8eFT-waAxNZOlzI';
    // const storedToken = localStorage.getItem('token');
    // this.token = storedToken ? storedToken : '';
    // console.log(this.token)

    this.categoryForm = new FormGroup({
      newCategoryName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
    });

    this.editCategoryForm = new FormGroup({
      editCategoryName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
  });
  }


  
  
  ngOnInit(): void {
    // if (this.token === localStorage.getItem('token')){
    //   console.log("authorized")
      this.getAllCategories()
    //}
    
  }

  // =============== Get All Cateogries ================== \\////
  getAllCategories() {
    const pageNum = 1; // Or any page number you want to fetch
    this.categoryService.getAllCategories(pageNum , this.token).pipe( map((data: any) => {
      console.log("data" , data)
      let categoriesArray = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          console.log("data[key]" , data[key])
          categoriesArray = data[key];
        }
      }
      return categoriesArray;
    }))
    .subscribe(
      (categories) => {
        this.categoriesArray = categories;

      },
      (error) => {
        console.error('Error getting categories:', error);
      }
    );
  }
 
 // =============== Add New Cateogrie ================== \\
  getNewCateogrName() {

    const categoryData = {
      name: this.categoryForm.value.newCategoryName,
    };
    this.categoryService.addCategory(categoryData, this.token).subscribe(
      (response) => {
        console.log('Category added successfully:', response);
        this.getAllCategories()
        window.location.reload();
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }


  // ======================= open and fill edit-modal ======================= \\
  editCategoryModal(category: any, content: any) {
    this.id = category.id;
    this.editCategoryForm.patchValue({
      editCategoryName: category.name,
    });
    this.modalService.open(content, { centered: true });
  }

  // ================= update ============ \\
  updateCategory() {
    console.log (this.token)
    const categoryData = {
      name: this.editCategoryForm.value.editCategoryName,
    };
    console.log(categoryData)
    if (categoryData) {
    this.categoryService.updateCategory(10,categoryData, this.token).subscribe(
      (response) => {
       
        console.log('Category updated successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error updating category:', error);
      }
      );
    }
    this.modalService.dismissAll();
  }
    
  // ===================== delete ===================== \\
  deleteCategoryModal(category: any, content: any) {
    this.id = category.id;
    this.modalService.open(content, { centered: true });
  }

  // ======================= delete ================== \\
  deleteCategory() {
    const categoryId = this.id;
    this.categoryService.deleteCategory(10,this.token).subscribe(
      (response) => {
        console.log('Category deleted successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }


  // deleteModal(category:any){
  //   this.modalService.open(DeleteConfirmComponent, { centered: true });
  //   this.deleteCategory(category);
  // }




//   // --------------------------- NgBootstrap Code --------------------------- \\
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

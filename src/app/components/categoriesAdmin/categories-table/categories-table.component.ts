import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
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
      
   // this.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTNhM2E4Njk4MDgyZjcxNmMwZDE2IiwidXNlcm5hbWUiOiJub291ciIsImZpcnN0TmFtZSI6Im5vdXIiLCJsYXN0TmFtZSI6IlRhcmVrIiwiZW1haWwiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJfX3YiOjB9LCJpYXQiOjE3MDg3NDY5Mzh9.TTUeyim_an7vooDly6t_LmiwebX76OXnYrAaWj9rhqU';
    const storedToken = localStorage.getItem('token');
    this.token = storedToken ? storedToken : '';
    console.log(this.token)

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

  // ================= get id ================ \\
  getCategoryId = (): number => {
    const category = this.categoriesArray
    .find((category: { name: any; id: number; }) => {
      return category.name === this.editCategoryForm.value.editCategoryName;
    });
  
    return category ? category.id : -1;
  }
  
  
  // ================= update ============ \\
  updateCategory() {
    this.getCategoryId()
    const categoryData = {
      name: this.editCategoryForm.value.editCategoryName,
    };
    console.log(categoryData)
    console.log (this.id)
    if (categoryData && this.id) {
    this.categoryService.updateCategory(this.id,categoryData,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTNhM2E4Njk4MDgyZjcxNmMwZDE2IiwidXNlcm5hbWUiOiJub291ciIsImZpcnN0TmFtZSI6Im5vdXIiLCJsYXN0TmFtZSI6IlRhcmVrIiwiZW1haWwiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJfX3YiOjB9LCJpYXQiOjE3MDg3NDczNDh9.zqZU7dvGn9r4td2CJqF_Rkz5Mc_dcHf38brAT4J6vpo').subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
      },
      (error) => {
        console.error('Error updating category:', error);
      }
      );
    }
    this.modalService.dismissAll();
  }
    
  // ===================== open deleteModal ===================== \\
  deleteCategoryModal(category: any, content: any) {
    this.id = category.id;
    this.modalService.open(content, { centered: true });
  }

  // ======================= delete ================== \\
  deleteCategory() {
    this.getCategoryId()
    const categoryId = this.id;
    this.categoryService.deleteCategory(categoryId,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRXhpc3QiOnsiX2lkIjoiNjVkNTNhM2E4Njk4MDgyZjcxNmMwZDE2IiwidXNlcm5hbWUiOiJub291ciIsImZpcnN0TmFtZSI6Im5vdXIiLCJsYXN0TmFtZSI6IlRhcmVrIiwiZW1haWwiOiJhZG1pbjFAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTIwVDIzOjQ4OjEwLjc4MFoiLCJfX3YiOjB9LCJpYXQiOjE3MDg3NDczNDh9.zqZU7dvGn9r4td2CJqF_Rkz5Mc_dcHf38brAT4J6vpo').subscribe(
      (response) => {
        console.log('Category deleted successfully:', response);
        this.getAllCategories()
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
    this.modalService.dismissAll();
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

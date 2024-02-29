import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService } from '../../services/admin.service.js';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  token: string = '';
  addAdminForm: FormGroup;
  constructor(private router: Router, private adminService: AdminService) {
    this.addAdminForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*'),
          this.noSpacesValidator,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z]*'),
          this.noSpacesValidator,
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check for spaces
  noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && /\s/.test(control.value)) {
      return { 'noSpaces': true };
    }
    return null;
  }

  // Custom validator to check if password matches rePassword
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if (password && rePassword && password.value !== rePassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  handleFormSubmit() {
    console.log(this.addAdminForm.value);
    this.token = localStorage.getItem('token') || ''
    this.adminService.addAdmin(this.addAdminForm.value,this.token).subscribe(
      (response) => {
        console.log('Message:', response.Message);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.router.navigate(['user']);
  }
}

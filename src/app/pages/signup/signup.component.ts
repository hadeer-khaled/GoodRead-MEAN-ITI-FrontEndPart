import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PasswordRegx } from '../../passwordRegex';
import { Router } from '@angular/router';
import { match } from 'node:assert';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  SignUpForm!: FormGroup;
  selectedImage = null;

  constructor(private router: Router, private userServics: UserService) {
    this.SignUpForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*'),
          this.noSpacesValidator,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*'),
          this.noSpacesValidator,
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(PasswordRegx),
        ]),
        rePassword: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  handleFormSubmit() {
    console.log(this.SignUpForm.value);
    this.userServics.register(this.SignUpForm.value).subscribe(
      (response) => {
        console.log('Message:', response.Message);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.router.navigate(['user']);
  }
  noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }

    return null;
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword');

    if (password !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
      rePassword?.markAsTouched();
    } else {
      rePassword?.setErrors(null);
    }

    return null;
  }
  onImageSelected(event: Event) {
    // this.selectedImage = event.target.files[0];
    console.log(event);
  }
}

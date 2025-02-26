import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpasswordService } from '../../../core/services/forgotpassword/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent {
  private router = inject(Router);
  private forgotpasswordService = inject(ForgotpasswordService);
  constructor() {}

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;

  email: string = '';
  userMsg: string = '';

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });

  resetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl(''),
  });

  forgotPassword(): void {
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;

    this.forgotpasswordService.forgotPassword(userEmail).subscribe({
      next: (response) => {
        console.log(response);
        this.userMsg = response.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
  resetCode(): void {
    let resetCode = this.resetCodeForm.value;
    this.forgotpasswordService.resetCode(resetCode).subscribe({
      next: (response) => {
        this.userMsg = response.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
  newPassword(): void {
    let resetForm = this.resetPassword.value;
    resetForm.email = this.email;

    this.forgotpasswordService.resetPassword(resetForm).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('eToken', response.token);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
}

import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string = '';
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?:\+20|0)?(10|11|12|15)\d{8}$/),
      ]),
    },
    this.confirmPassword
  );

  // Make Custome Validation
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { missmatched: true };
    }
  }

  registerSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterToApi(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            // Programming Routing =.> login
            this.router.navigate(['/login']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}

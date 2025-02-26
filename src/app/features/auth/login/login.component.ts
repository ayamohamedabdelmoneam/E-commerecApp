import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginToApi(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            // 1-set Token To => local Storage
            localStorage.setItem('userToken', res.token);
            // 2- save Token => services ==> all shared
            this.authService.saveData();
            // 3- Make Navigate => to Home
            this.router.navigate(['/home']);
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

import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  islogin: boolean = false;
  ngOnInit(): void {
    this.authService.userData.subscribe(() => {
      if (this.authService.userData.getValue() == null) {
        this.islogin = false;
      } else {
        this.islogin = true;
      }
    });
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    this.authService.userData.next(null);
  }
}

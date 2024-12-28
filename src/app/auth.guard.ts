// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch: CanMatchFn = (route, segments) => {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole(); // Check role from the token
      if (userRole === 'Admin') {
        return true;  // Admin has access to everything
      } else {
        // Logic for other roles (Trainee, Trainer) can be added here if necessary
        return true;
      }
    }

    this.router.navigate(['/home']);
    return false;
  };
}

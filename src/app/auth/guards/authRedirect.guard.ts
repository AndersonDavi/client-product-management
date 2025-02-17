import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.token && authService.userID) {
    if (authService.userRole === 'admin') {
      router.navigate(['/dashboard']);
    } else if (authService.userRole === 'user') {
      router.navigate(['/home']);
    }
    return false;
  }
  return true;
};

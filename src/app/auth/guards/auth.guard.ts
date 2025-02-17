import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.token || !authService.userID) {
    router.navigate(['/auth']);
    return false;
  }
  let token = authService.token;
  let expiration = JSON.parse(atob(token.split('.')[1])).exp;
  if (Math.floor(new Date().getTime() / 1000) >= expiration) {
    authService.logout();
    return false;
  }
  return true;
};

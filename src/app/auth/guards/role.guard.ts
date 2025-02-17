import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userRole = authService.userRole;
  const url = state.url;

  console.log('roleGuard', userRole, url);
  
  if (userRole === 'admin' && url.includes('/home')) {
    router.navigate(['/dashboard']);
    return false;
  }

  if (userRole === 'user' && url.includes('/dashboard')) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};

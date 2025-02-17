import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { authRedirectGuard } from './auth/guards/authRedirect.guard';
import { roleGuard } from './auth/guards/role.guard';
import { Error404Component } from './shared/pages/Error404/Error404.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authRedirectGuard],
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard,roleGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    canActivate: [authGuard,roleGuard],
    loadChildren: () => import('./home/home.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

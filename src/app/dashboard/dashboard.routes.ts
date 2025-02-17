import { Routes } from '@angular/router';
import { LayoutPageComponent } from './layout/layout-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { EditProfilePageComponent } from '../shared/pages/edit-profile-page/edit-profile-page.component';
import { InvoicesListPageComponent } from './pages/invoices-list-page/invoices-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'users', component: UsersListPageComponent },
      { path: 'user/:id', component: UserDetailPageComponent },
      { path: 'products', component: ProductsListPageComponent },
      { path: 'product/:id', component: ProductDetailPageComponent },
      { path: 'profile', component: EditProfilePageComponent },
      { path: 'invoices', component: InvoicesListPageComponent },
      { path: '**', redirectTo: 'products' },
    ],
  },
];

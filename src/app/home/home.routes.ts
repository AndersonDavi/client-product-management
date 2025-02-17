import { Routes } from '@angular/router';
import { LayoutPageComponent } from './layout/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { EditProfilePageComponent } from '../shared/pages/edit-profile-page/edit-profile-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { MyOrdersPageComponent } from './pages/my-orders-page/my-orders-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'products', component: HomePageComponent },
      { path: 'product/:id', component: ProductDetailPageComponent },
      { path: 'orders', component: MyOrdersPageComponent },
      { path: 'profile', component: EditProfilePageComponent },
      { path: 'shopping-cart', component: ShoppingCartPageComponent },
      { path: '**', redirectTo: 'products' },
    ],
  },
];

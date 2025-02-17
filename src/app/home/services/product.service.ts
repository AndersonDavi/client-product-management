import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { catchError, map, of } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private cartService: ShoppingCartService) {}

  // Product Methods
  getProducts() {
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'product/';
    return this.http.get(URL, { headers }).pipe(
      map((resp: any) => {
        return resp.products;
      }),
      catchError((err: any) => {
        return of([]);
      })
    );
  }

  getProduct(id: string) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `product/${id}`;
    return this.http.get(URL, { headers }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        return of(null);
      })
    );
  }

  createProduct(data: any) {
    
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'product/create';
    return this.http.post(URL, data, { headers }).pipe(
      map((resp: any) => {
        return resp.product;
      }),
      catchError((err: any) => {
        return of(null);
      })
    );
  }

  updateProduct(id: string, data: any) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `product/update/${id}`;
    return this.http.put(URL, data, { headers }).pipe(
      map((resp: any) => {
        return resp.product;
      }),
      catchError((err: any) => {
        return of(null);
      })
    );
  }

  deleteProduct(id: string, newStatus: boolean) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `product/delete/${id}`;
    return this.http.put(URL, { newStatus }, { headers }).pipe(
      map((resp: any) => {
        return resp.product;
      }),
      catchError((err: any) => {
        return of(null);
      })
    );
  }

  addToCart(product: any, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
  }

  // Helper Methods
  private getAuthHeaders(): HttpHeaders {
    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }
}

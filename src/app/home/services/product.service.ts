import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // Product Methods
  getProducts() {
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'product/';
    return this.http.get(URL, { headers }).pipe(
      map((resp: any) => {
        return resp.products;
      }),
      catchError((err: any) => {
        console.log(err.error.message);
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
        console.log(err.error.message);
        return of(null);
      })
    );
  }

  createProduct(data: any) {
    console.log(data);
    
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'product/create';
    return this.http.post(URL, data, { headers }).pipe(
      map((resp: any) => {
        return resp.product;
      }),
      catchError((err: any) => {
        console.log(err.error.message);
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
        console.log(err.error.message);
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
        console.log(err.error.message);
        return of(null);
      })
    );
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

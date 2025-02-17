import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getUserInvoices(userId: string) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `invoice/user/${userId}`;
    return this.http.get(URL, { headers }).pipe(
      map((resp: any) => resp.invoices),
      catchError((err: any) => {
        console.log(err.error.message);
        return of([]);
      })
    );
  }

  countAllinvoicesLastMonth() {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `invoice/data/count-all-invoices-last-month`;
    return this.http.get(URL, { headers }).pipe(
      map((resp: any) => resp.count),
      catchError((err: any) => {
        console.log(err.error.message);
        return of(0);
      })
    );
  }

  getAllPurchasesLastMonth() {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `invoice/data/all-purchases-last-month`;
    return this.http.get(URL, { headers }).pipe(
      map((resp: any) => resp.count),
      catchError((err: any) => {
        console.log(err.error.message);
        return of(0);
      })
    );
  }

  createInvoice(invoiceData: any) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'invoice/create';
    return this.http.post(URL, invoiceData, { headers }).pipe(
      map((resp: any) => resp.invoice),
      catchError((err: any) => {
        console.log(err.error.message);
        return of(null);
      })
    );
  }

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

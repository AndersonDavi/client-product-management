import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../../config/config';
import { catchError, map, of, throwError, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = '';
  userID: any | null = {};
  userRole: any | null = {};
  constructor(private http: HttpClient, private router: Router) {
    this.getLocalStorage();
  }

  login(email: string, password: string) {
    let URl = API_URL + 'auth/login';
    return this.http.post(URl, { email, password }).pipe(
      switchMap((resp: any) => {
        if (resp.result) {
          this.token = resp.result;
          return this.getUserLogged(resp.result).pipe(
            tap((user: any) => {
              this.localStorageSave({
                token: resp.result,
                id: user.id,
                role: user.role,
              });
              this.getLocalStorage();
            }),
            map(() => true)
          );
        } else {
          return of(resp);
        }
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }
  localStorageSave(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.id);
    localStorage.setItem('role', data.role);
    return true;
  }
  private getAuthHeaders(): HttpHeaders {
    const token = this.token;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getUserLogged(token: string) {
    const headers = this.getAuthHeaders();
    let URl = API_URL + 'auth/profile';
    return this.http.get(URl, { headers }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        if (err.error.message) {
          console.log(err.error.message);
        }
        return of(err);
      })
    );
  }
  getLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    if (localStorage.getItem('user')) {
      this.userID = localStorage.getItem('user')!;
    } else {
      this.userID = null;
    }
    if (localStorage.getItem('role')) {
      this.userRole = localStorage.getItem('role')!;
    } else {
      this.userRole = null;
    }
  }
  register(data: any) {
    let URl = API_URL + 'auth/register';
    return this.http.post(URl, data).pipe(
      map((resp: any) => {
        if (resp.result) {
          return true;
        } else {
          return resp;
        }
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.getLocalStorage();
    this.router.navigate(['/auth']);
  }
}

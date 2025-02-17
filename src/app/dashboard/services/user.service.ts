import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // User Methods
  getUsers() {
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'user/';
    const currentUserId = localStorage.getItem('user');
    return this.http.get(URL, { headers }).pipe(
      map((resp: any) => {
        return resp.users.filter((user: any) => user._id !== currentUserId);
      }),
      catchError((err: any) => {
        console.log(err.error.message);
        return of([]);
      })
    );
  }

  getUser(id: string) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `user/${id}`;
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

  createUser(data: any) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'user/create';
    return this.http.post(URL, data, { headers }).pipe(
      map((resp: any) => {
        return resp.user;
      }),
      catchError((err: any) => {
        console.log(err.error.message);
        return of(null);
      })
    );
  }

  updateUser(id: string, data: any) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + `user/update/${id}`;
    return this.http.put(URL, data, { headers }).pipe(
      map((resp: any) => {
        return resp.user;
      }),
      catchError((err: any) => {
        console.log(err.error.message);
        return of(null);
      })
    );
  }

  updateOwnProfile(data: any) {
    const headers = this.getAuthHeaders();
    let URL = API_URL + 'user/update';
    return this.http.put(URL, data, { headers }).pipe(
      map((resp: any) => {
        return resp.user;
      }),
      catchError((err: any) => {
        console.log(err.error.message);
        return of(null);
      })
    );
  }

  deleteUser(id: string, newStatus: boolean) {
    const headers = this.getAuthHeaders();
    console.log('newStatus', headers);
    
    let URL = API_URL + `user/delete/${id}`;
    return this.http.put(URL, { newStatus }, { headers }).pipe(
      map((resp: any) => {
        return resp.user;
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

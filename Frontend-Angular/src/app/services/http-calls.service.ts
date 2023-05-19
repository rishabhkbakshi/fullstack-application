import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  readonly apiUrl: string = 'http://localhost:8080/'

  constructor(private http: HttpClient) {

  }

  // get => select operation 
  getUsers() {
    return this.http.get(`${this.apiUrl}users`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).toPromise();
  }

  // post => insert operation 
  addUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}users`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).toPromise();
  }

  // put => update operation 
  updateUser(id: any, user: any) {
    return this.http.put<any>(`${this.apiUrl}users/${id}`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).toPromise();
  }

  // delete => delete operation 
  deleteUser(id: any) {
    return this.http.delete(`${this.apiUrl}users/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).toPromise();
  }
}

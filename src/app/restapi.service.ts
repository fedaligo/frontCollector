import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from './entity/users';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
public token: any;
public allUsers: any;
  constructor(private http: HttpClient) { }

  login(userName: string, password: string){
    const body = {userName, password};
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    this.http.post('http://localhost:5000/users/authenticate', body,{headers, responseType: 'text' as 'json'}).subscribe((response) => {
      this.token = response;
      localStorage.setItem('auth_token', this.token);
      localStorage.setItem('currentUser', userName);
    });
  }

  getTokenFromLocalStorage(){
    this.token = localStorage.getItem('auth_token');
    return this.token;
  }
  logout(){
    localStorage.removeItem('auth_token');
  }
  getAllUsers() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get<Users[]>('http://localhost:5000/users/allusers',{headers}).subscribe((response) => {
      this.allUsers = response;
    });
  }
}

import { Component } from '@angular/core';
import {AppComponent} from '../app.component';
import {GreatestCollections} from '../entity/greatestCollections';
import {Tags} from '../entity/tags';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LastThreeItems} from '../entity/lastThreeItems';
import {Users} from '../entity/users';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  response: any;
  displayedColumns: string[] = ['id', 'login', 'mail', 'role', 'button'];
  allUsers: Users[];
  constructor(private http: HttpClient, public svc: SearchServiceService, public service: RestapiService) {
    const headers = new HttpHeaders({Authorization: `Bearer ${service.getTokenFromLocalStorage()}`});
    this.http.get<Users[]>('http://localhost:5000/users/allusers', {headers}).subscribe(result => {
      this.allUsers = result;
    });
  }
}

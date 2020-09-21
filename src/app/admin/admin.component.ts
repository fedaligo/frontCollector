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
  displayedColumns: string[] = ['login', 'mail', 'role', 'button'];
  constructor(private http: HttpClient, public svc: SearchServiceService, public service: RestapiService) {
    service.getAllUsers();
  }
}

import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../restapi.service';
import {SearchServiceService} from '../search-service.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {
  allItems: any;
  displayedColumns1: string[] = ['picture', 'topic', 'name', 'country', 'release', 'cost', 'info', 'button'];
  constructor(public svc: SearchServiceService, public service: RestapiService) {
  }
  getCurrentUserName(){
    return localStorage.getItem('currentUser');
  }
  ngOnInit(): void {
  }

}

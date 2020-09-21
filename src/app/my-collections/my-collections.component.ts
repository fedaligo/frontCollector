import { Component, OnInit } from '@angular/core';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {
  displayedColumns: string[] = ['login', 'topic', 'count', 'button'];
  constructor(public svc: SearchServiceService, public service: RestapiService) {
    svc.findItemsByUserName();
  }

  ngOnInit(): void {
  }
  getCurrentUserName(){
    return localStorage.getItem('currentUser');
  }
}

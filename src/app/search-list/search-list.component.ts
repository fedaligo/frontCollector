import { Component, OnInit } from '@angular/core';
import {SearchServiceService} from '../search-service.service';
import {HttpClient} from '@angular/common/http';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent{
  displayedColumns: string[] = ['picture', 'topic', 'name', 'country', 'release', 'cost', 'info', 'button'];
  constructor(public svc: SearchServiceService, public service: RestapiService) {
  }
  getWord(){
    return localStorage.getItem('word');
  }
}

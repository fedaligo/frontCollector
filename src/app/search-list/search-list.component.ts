import { Component, OnInit } from '@angular/core';
import {SearchServiceService} from '../search-service.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent{
  findAllItem: any;
  displayedColumns: string[] = ['picture', 'topic', 'name', 'country', 'release', 'cost', 'info', 'button'];
  constructor(public svc: SearchServiceService) {
    this.findAllItem = svc.findAllItem();
  }
}

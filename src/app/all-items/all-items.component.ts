import { Component, OnInit } from '@angular/core';
import {Tags} from '../entity/tags';
import {HttpClient} from '@angular/common/http';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {
  allItems: any;
  displayedColumns1: string[] = ['picture', 'topic', 'name', 'country', 'release', 'cost', 'info', 'button'];
  constructor(private http: HttpClient, public svc: SearchServiceService, public service: RestapiService) {
    this.http.get('https://collector-fed.herokuapp.com/collection/allitems').subscribe(result => {
      this.allItems = result;
    });
  }

  ngOnInit(): void {
  }

}

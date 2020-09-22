import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-all-collections',
  templateUrl: './all-collections.component.html',
  styleUrls: ['./all-collections.component.css']
})
export class AllCollectionsComponent implements OnInit {
  allCollections: any;
  displayedColumns: string[] = ['login', 'topic', 'count', 'button'];
  constructor(private http: HttpClient, public svc: SearchServiceService, public service: RestapiService) {
    this.http.get('https://collector-fed.herokuapp.com/collection/allcollections').subscribe(result => {
      this.allCollections = result;
    });
  }

  ngOnInit(): void {
  }

}

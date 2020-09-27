import { Component, OnInit } from '@angular/core';
import {LastThreeItems} from '../entity/lastThreeItems';
import {GreatestCollections} from '../entity/greatestCollections';
import {Tags} from '../entity/tags';
import {HttpClient} from '@angular/common/http';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

export interface Tile {
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  panelOpenState = false;
  displayedColumns: string[] = ['login', 'topic', 'count', 'button'];
  displayedColumns1: string[] = ['picture', 'topic', 'name', 'country', 'release', 'cost', 'info', 'button'];
  lastThreeItems: any;
  greatestCollections: any;
  allTags: any;
  constructor(private http: HttpClient, public svc: SearchServiceService, public service: RestapiService) {
    this.http.get('https://collector-fed.herokuapp.com/collection/lastthreeitems').subscribe(result => {
      this.lastThreeItems = result;
    });
    this.http.get('https://collector-fed.herokuapp.com/collection/threegreatestcollections').subscribe( result => {
      this.greatestCollections = result;
    });
    this.http.get('https://collector-fed.herokuapp.com/tags/alltags').subscribe(result => {
      this.allTags = result;
    });
  }
  drop(event: CdkDragDrop<Tags[]>) {
    moveItemInArray(this.allTags, event.previousIndex, event.currentIndex);
  }
  cleanMessage(){
    this.service.deleteMessage = null;
    this.service.updateItemMessage = null;
    this.service.createItemMessage = null;
  }
}

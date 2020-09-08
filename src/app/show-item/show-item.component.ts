import { Component, OnInit } from '@angular/core';
import {Tile} from '../main/main.component';
import {SearchServiceService} from '../search-service.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent {
  tiles: Tile[] = [
    {cols: 2, rows: 1},
    {cols: 4, rows: 1},
    {cols: 4, rows: 1},
  ];
  constructor(public svc: SearchServiceService) { }

}

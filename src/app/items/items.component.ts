import { Component, OnInit } from '@angular/core';

import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  displayedColumns1: string[] = ['picture', 'topic', 'name', 'country', 'release', 'cost', 'info', 'button'];
  constructor(public svc: SearchServiceService, public service: RestapiService) {
  }

  ngOnInit(): void {
  }

}

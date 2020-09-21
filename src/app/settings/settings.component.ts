import {Component, OnInit} from '@angular/core';
import {RestapiService} from '../restapi.service';
import {SearchServiceService} from '../search-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(public svc: SearchServiceService, public service: RestapiService) {
    this.service.userByUserName();
  }

  ngOnInit(): void {
  }

}

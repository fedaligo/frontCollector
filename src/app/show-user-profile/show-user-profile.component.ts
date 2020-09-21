import { Component, OnInit } from '@angular/core';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-show-user-profile',
  templateUrl: './show-user-profile.component.html',
  styleUrls: ['./show-user-profile.component.css']
})
export class ShowUserProfileComponent implements OnInit {
  constructor(public svc: SearchServiceService, public service: RestapiService) {
    this.service.anotherUserByUserName(this.svc.getAnotherUserName());
    this.svc.findItemsOfAnotherUserName(this.svc.getAnotherUserName());
  }

  ngOnInit(): void {
  }

}

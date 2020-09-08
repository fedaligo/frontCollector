import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchServiceService} from './search-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  token: any;
  value = '';
  public isChecked = true;
  mycolor: string[] = ['dark theme', 'light theme'];
  constructor(public svc: SearchServiceService) {
  }
}


import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  hide = true;
  userName: string;
  password: string;
  message: any;
  allUsers: any;
  displayedColumns: string[] = ['id', 'login', 'mail', 'role', 'button'];
  constructor(public service: RestapiService) {
  }
  doLogin(){
    const resp = this.service.login(this.userName, this.password);
}
}

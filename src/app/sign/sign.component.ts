import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../restapi.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  hide = true;
  userName: string;
  password: string;
  message: any = 'Incorrect login or password.';
  allUsers: any;
  latinPatern = '^[a-zA-Z0-9\\s]+$';
  loginFormControl = new FormControl('', [
    Validators.pattern(this.latinPatern),
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.pattern(this.latinPatern),
    Validators.required,
  ]);
  displayedColumns: string[] = ['id', 'login', 'mail', 'role', 'button'];
  constructor(public service: RestapiService) {
    this.service.message = '';
  }
  doLogin(){
    const resp = this.service.login(this.userName, this.password);
}
}

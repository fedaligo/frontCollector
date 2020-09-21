import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../restapi.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userName: string;
  password: string;
  mail: string;
  hide = true;
  message: any;
  loginFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(public service: RestapiService) {
    this.service.registrationMessage = '';
  }
  doRegistration(){
    this.service.registration(this.userName, this.password, this.mail);
  }
  ngOnInit(): void {
  }

}

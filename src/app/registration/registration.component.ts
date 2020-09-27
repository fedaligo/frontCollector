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
  latinPatern = '^[a-zA-Z0-9\\s]+$';
  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.latinPatern),
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.latinPatern),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(this.latinPatern),
  ]);
  constructor(public service: RestapiService) {
    this.service.registrationMessage = '';
  }
  doRegistration(){
    this.service.registration(this.userName, this.password, this.mail);
  }
  doLogin(){
    const resp = this.service.login(this.userName, this.password);
  }
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
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
  roleFormControl = new FormControl('', [
    Validators.required,
  ]);
  roleUser: any = 'ROLE_USER';
  options: string[] = ['ROLE_ADMIN', 'ROLE_USER'];
  constructor(public svc: SearchServiceService, public service: RestapiService) {
    this.service.userByUserName();
    this.service.password = '';
  }
  updateUser(){
    this.service.updateUser(this.roleUser);
  }


  ngOnInit(): void {
  }

}

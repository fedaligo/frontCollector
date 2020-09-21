import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-show-another-user-profile',
  templateUrl: './show-another-user-profile.component.html',
  styleUrls: ['./show-another-user-profile.component.css']
})
export class ShowAnotherUserProfileComponent implements OnInit {
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
  roleUser: any;
  options: string[] = ['ROLE_ADMIN', 'ROLE_USER'];
  constructor(public svc: SearchServiceService, public service: RestapiService) {
    this.service.anotherUserByUserName(this.svc.getAnotherUserName());
    this.service.password = '';
  }
  updateUser(){
    this.service.updateAnotherUser(this.roleUser);
  }

  ngOnInit(): void {
  }

}

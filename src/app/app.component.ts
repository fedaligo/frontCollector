import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchServiceService} from './search-service.service';
import {RestapiService} from './restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  token: any;
  value = '';
  isChecked: boolean;
  mycolor: string[] = ['dark theme', 'light theme'];
  constructor(public svc: SearchServiceService, public service: RestapiService) {
    if (this.getIsChecked() === null){
      localStorage.setItem('isChecked', 'true');
    }
    this.setIsChecked();
  }
  setIsChecked(){
    if (this.getIsChecked() === 'true'){
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }
  setColorTolbar(){
    if (this.isChecked){
      localStorage.removeItem('currentColorTolbar');
      localStorage.removeItem('isChecked');
      localStorage.setItem('isChecked', 'true');
      localStorage.setItem('currentColorTolbar', 'accent');
    } else{
      localStorage.removeItem('currentColorTolbar');
      localStorage.removeItem('isChecked');
      localStorage.setItem('isChecked', 'false');
      localStorage.setItem('currentColorTolbar', 'primary');
    }
  }
  setColorBackGround(){
    if (this.isChecked){
      localStorage.removeItem('currentColorBackGround');
      localStorage.setItem('currentColorBackGround', 'bg1');
      this.service.backGroundColor = localStorage.getItem('currentColorBackGround');
    } else{
      localStorage.removeItem('currentColorBackGround');
      localStorage.setItem('currentColorBackGround', 'bg2');
      this.service.backGroundColor = localStorage.getItem('currentColorBackGround');
    }
  }
  getColorTolbar(){
    return localStorage.getItem('currentColorTolbar');
  }
  getColorBackGround(){
    return localStorage.getItem('currentColorBackGround');
  }
  getIsChecked(){
    return localStorage.getItem('isChecked');
  }
  getCurrentUserName(){
    return localStorage.getItem('currentUser');
  }
}


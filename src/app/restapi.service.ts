import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from './entity/users';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  public isChecked: boolean;
  public token: any;
  public id: any;
  public anotherId: any;
  public userName: any;
  public updateUserName: any;
  public updateAnotherUserName: any;
  public mail: any;
  public anotherMail: any;
  public password: any;
  public allUsers: any;
  public message: any;
  public registrationMessage: any;
  public deleteMessage: any;
  public responseIsOwnerOrAdmin: any;
  public role: any = this.getRoleFromLocalStorage();
  public addLikeMessage: any;
  public deleteLikeMessage: any;
  public isHaveLikeMessage: any;
  public addCommentMessage: any;
  public deleteCommentMessage: any;
  public allComments: any;
  public allCommentsByItemId: any;
  public commentsUsersNamesByItemId: any;
  public ownerUserName: any = localStorage.getItem('ownerName') ;
  public backGroundColor: any = localStorage.getItem('currentColorBackGround');
  public responseUserByUserName: any;
  public responseAnotherUserByUserName: any = this.anotherUserByUserName(this.getAnotherUserName());
  public updateMessage: any;
  public userProfile = ['ID:', 'USERNAME:', 'PASSWORD:', 'MAIL:', 'ROLE:', 'COUNT OF ITEMS:'];
  constructor(private http: HttpClient) {
  }

  login(userName: string, password: string) {
    this.message = '';
    const body = {userName, password};
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(userName + ':' + password)});
    this.http.post('http://localhost:5000/users/authenticate', body, {headers, responseType: 'text' as 'json'}).subscribe((response) => {

      if (response !== '') {
        this.token = response;
        this.userName = userName;
        this.message = '';
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('currentUser', userName);
        this.getRole();
      } else {
        this.message = 'Incorrect login or password.';
      }
    });
  }

  getTokenFromLocalStorage() {
    this.token = localStorage.getItem('auth_token');
    return this.token;
  }

  getUserNameFromLocalStorage() {
    this.userName = localStorage.getItem('currentUser');
    return this.userName;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('roleAdmin');
    localStorage.removeItem('currentUser');
    this.responseUserByUserName = null;
    this.role = null;
    this.userName = null;
  }

  getAllUsers() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get<Users[]>('http://localhost:5000/users/allusers', {headers}).subscribe((response) => {
      this.allUsers = response;
    });
  }

  getRole() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get('http://localhost:5000/users/usersrole', {headers, responseType: 'text' as 'json'}).subscribe((response) => {
      if (response === '[admin]') {
        this.role = response;
        localStorage.setItem('roleAdmin', this.role);
      }
    });
  }

  getRoleFromLocalStorage() {
    return localStorage.getItem('roleAdmin');
  }

  registration(userName: string, password: string, mail: string) {
    const body = {userName, password, mail};
    this.http.post('http://localhost:5000/users/registration', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      if (response !== ''){
        this.registrationMessage = response;
      }
    });
  }

  updateUser(role: string) {
    if (this.userName !== this.updateUserName){
      this.logout();
    }
    const body = {userId: this.id, userName: this.updateUserName, password: this.password, mail: this.mail, usersRole: role};
    this.http.put('http://localhost:5000/users/updateuser', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      if (response !== ''){
        this.updateMessage = response;
        this.userByUserName();
      }
    });
  }

  updateAnotherUser(role: string) {
    const body = {userId: this.anotherId, userName: this.updateAnotherUserName, password: this.password, mail: this.anotherMail, usersRole: role};
    this.http.put('http://localhost:5000/users/updateuser', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      if (response !== ''){
        this.updateMessage = response;
        localStorage.removeItem('anotherUserName');
        localStorage.setItem('anotherUserName', this.updateAnotherUserName);
        this.anotherUserByUserName(this.getAnotherUserName());
      }
    });
  }

  deleteUser(id) {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.delete('http://localhost:5000/users/delete/' + id, {headers, responseType: 'text' as 'json'}).subscribe((response) => {
      this.deleteMessage = response;
      this.getAllUsers();
    });
  }

  isOwnerOrAdmin() {
    this.responseIsOwnerOrAdmin = null;
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get('http://localhost:5000/users/isowneroradmin?id=' + localStorage.getItem('itemId'),
      {headers}).subscribe((response) => {
      if (response === true) {
        this.responseIsOwnerOrAdmin = response;
      }
    });
  }

  ownerName() {
    this.http.get('http://localhost:5000/users/ownername?id=' + localStorage.getItem('itemId'), {responseType: 'text' as 'json'}).subscribe((response) => {
        this.ownerUserName = response;
        localStorage.setItem('ownerName', this.ownerUserName);
    });
  }

  userByUserName() {
    this.http.get('http://localhost:5000/users/userbyusername?userName=' + localStorage.getItem('currentUser')).subscribe((response) => {
      this.responseUserByUserName = response;
      this.mail = this.responseUserByUserName.mail;
      this.updateUserName = this.responseUserByUserName.username;
      this.id = this.responseUserByUserName.id;
    });
  }

  anotherUserByUserName(userName) {
    localStorage.setItem('anotherUserName', userName);
    this.http.get('http://localhost:5000/users/userbyusername?userName=' + userName).subscribe((response) => {
      this.responseAnotherUserByUserName = response;
      this.anotherMail = this.responseAnotherUserByUserName.mail;
      this.updateAnotherUserName = this.responseAnotherUserByUserName.username;
      this.anotherId = this.responseAnotherUserByUserName.id;
    });
  }
  getAnotherUserName(){
    return localStorage.getItem('anotherUserName');
  }
  setMailLocalStorage(){
    localStorage.setItem('mail', this.mail);
  }

  addLike() {
    const idCollection = localStorage.getItem('itemId');
    const authHeader = `Bearer ${this.getTokenFromLocalStorage()}`;
    const body = {idCollection, authHeader};
    this.http.post('http://localhost:5000/likes/addlike', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      this.addLikeMessage = response;
      this.isHaveLike();
    });
  }

  deleteLike() {
    const id = localStorage.getItem('itemId');
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.delete('http://localhost:5000/likes/deletelike?id=' + id, {headers, responseType: 'text' as 'json'}).subscribe((response) => {
      this.deleteLikeMessage = response;
      this.isHaveLikeMessage = null;
    });
  }

  isHaveLike() {
    this.isHaveLikeMessage = null;
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get('http://localhost:5000/likes/ishavelike?id=' + localStorage.getItem('itemId'),
      {headers}).subscribe((response) => {
      if (response === true) {
        this.isHaveLikeMessage = response;
      }
    });
  }


  addComment(comment) {
    const idCollection = localStorage.getItem('itemId');
    const authHeader = `Bearer ${this.getTokenFromLocalStorage()}`;
    const body = {comment, idCollection, authHeader};
    this.http.post('http://localhost:5000/comments/addcomment', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      this.addCommentMessage = response;
      this.getCommentsByItemId();
    });
  }

  deleteComment(idCom) {
    this.http.delete('http://localhost:5000/comments/deletecomment?id=' + idCom, {responseType: 'text' as 'json'}).subscribe((response) => {
      this.deleteCommentMessage = response;
      this.getCommentsByItemId();
    });
  }

  getAllComments() {
    this.http.get('http://localhost:5000/comments/allcomments').subscribe((response) => {
        this.allComments = response;
    });
  }
  getCommentsByItemId() {
    const idCollection = localStorage.getItem('itemId');
    this.http.get('http://localhost:5000/comments/getcommentsbyitemid?itemId=' + idCollection).subscribe((response) => {
      this.allCommentsByItemId = response;
      this.getCommentsUsersNamesByItemId();
    });
  }
  getCommentsUsersNamesByItemId() {
    const itemId = localStorage.getItem('itemId');
    this.http.get('http://localhost:5000/comments/getusersnamesbyitem?itemId=' + itemId).subscribe((response) => {
      this.commentsUsersNamesByItemId = response;
    });
  }
}

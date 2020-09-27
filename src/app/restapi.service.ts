import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from './entity/users';
import {Items} from './entity/items';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  public updateItemMessage: any;
  public collectionId: any;
  public badgesId: any;
  public booksId: any;
  public coinsId: any;
  public stampsId: any;
  public wineId: any;
  public name: any;
  public topic: any;
  public picture: any;
  public cost: any = 0;
  public info: any;
  public country: any;
  public release: any = 2020;
  public itemsUserName = localStorage.getItem('itemsUserName');
  public material: any;
  public badgesKind: any;
  public fastening: any;
  public author: any;
  public pages: any = 0;
  public publishingHouse: any;
  public coinsKind: any;
  public size: any = 0;
  public metal: any;
  public perforation: any = 'false';
  public value: any = 0;
  public color: any;
  public alcohol: any = 0;
  public sugar: any = 0;
  public wineKind: any;
  public tags: string[];
  public createItemMessage: any;
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
  public ownerUserName: any = localStorage.getItem('ownerName');
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
    this.http.post('https://collector-fed.herokuapp.com/users/authenticate', body, {
      headers,
      responseType: 'text' as 'json'
    }).subscribe((response) => {

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
    this.http.get<Users[]>('https://collector-fed.herokuapp.com/users/allusers', {headers}).subscribe((response) => {
      this.allUsers = response;
    });
  }

  getRole() {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get('https://collector-fed.herokuapp.com/users/usersrole', {
      headers,
      responseType: 'text' as 'json'
    }).subscribe((response) => {
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
    this.http.post('https://collector-fed.herokuapp.com/users/registration', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      if (response !== '') {
        this.registrationMessage = response;
      }
    });
  }

  updateUser(role: string) {
    if (this.userName !== this.updateUserName) {
      this.logout();
    }
    const body = {userId: this.id, userName: this.updateUserName, password: this.password, mail: this.mail, usersRole: role};
    this.http.put('https://collector-fed.herokuapp.com/users/updateuser', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      if (response !== '') {
        this.updateMessage = response;
        this.userByUserName();
      }
    });
  }

  updateAnotherUser(role: string) {
    const body = {
      userId: this.anotherId,
      userName: this.updateAnotherUserName,
      password: this.password,
      mail: this.anotherMail,
      usersRole: role
    };
    this.http.put('https://collector-fed.herokuapp.com/users/updateuser', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      if (response !== '') {
        this.updateMessage = response;
        localStorage.removeItem('anotherUserName');
        localStorage.setItem('anotherUserName', this.updateAnotherUserName);
        this.anotherUserByUserName(this.getAnotherUserName());
      }
    });
  }

  deleteUser(id) {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.delete('https://collector-fed.herokuapp.com/users/delete/' + id, {
      headers,
      responseType: 'text' as 'json'
    }).subscribe((response) => {
      this.deleteMessage = response;
      this.getAllUsers();
    });
  }

  isOwnerOrAdmin() {
    this.responseIsOwnerOrAdmin = null;
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get('https://collector-fed.herokuapp.com/users/isowneroradmin?id=' + localStorage.getItem('itemId'),
      {headers}).subscribe((response) => {
      if (response === true) {
        this.responseIsOwnerOrAdmin = response;
      }
    });
  }

  ownerName() {
    this.http.get('https://collector-fed.herokuapp.com/users/ownername?id=' + localStorage.getItem('itemId'), {responseType: 'text' as 'json'}).subscribe((response) => {
      this.ownerUserName = response;
      localStorage.setItem('ownerName', this.ownerUserName);
    });
  }

  userByUserName() {
    this.http.get('https://collector-fed.herokuapp.com/users/userbyusername?userName=' + localStorage.getItem('currentUser')).subscribe((response) => {
      this.responseUserByUserName = response;
      this.mail = this.responseUserByUserName.mail;
      this.updateUserName = this.responseUserByUserName.username;
      this.id = this.responseUserByUserName.id;
    });
  }

  anotherUserByUserName(userName) {
    localStorage.setItem('anotherUserName', userName);
    this.http.get('https://collector-fed.herokuapp.com/users/userbyusername?userName=' + userName).subscribe((response) => {
      this.responseAnotherUserByUserName = response;
      this.anotherMail = this.responseAnotherUserByUserName.mail;
      this.updateAnotherUserName = this.responseAnotherUserByUserName.username;
      this.anotherId = this.responseAnotherUserByUserName.id;
    });
  }

  getAnotherUserName() {
    return localStorage.getItem('anotherUserName');
  }

  setMailLocalStorage() {
    localStorage.setItem('mail', this.mail);
  }

  addLike() {
    const idCollection = localStorage.getItem('itemId');
    const authHeader = `Bearer ${this.getTokenFromLocalStorage()}`;
    const body = {idCollection, authHeader};
    this.http.post('https://collector-fed.herokuapp.com/likes/addlike', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      this.addLikeMessage = response;
      this.isHaveLike();
    });
  }

  deleteLike() {
    const id = localStorage.getItem('itemId');
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.delete('https://collector-fed.herokuapp.com/likes/deletelike?id=' + id, {
      headers,
      responseType: 'text' as 'json'
    }).subscribe((response) => {
      this.deleteLikeMessage = response;
      this.isHaveLikeMessage = null;
    });
  }

  isHaveLike() {
    this.isHaveLikeMessage = null;
    const headers = new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
    this.http.get('https://collector-fed.herokuapp.com/likes/ishavelike?id=' + localStorage.getItem('itemId'),
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
    this.http.post('https://collector-fed.herokuapp.com/comments/addcomment', body, {responseType: 'text' as 'json'}).subscribe((response) => {
      this.addCommentMessage = response;
      this.getCommentsByItemId();
    });
  }

  deleteComment(idCom) {
    this.http.delete('https://collector-fed.herokuapp.com/comments/deletecomment?id=' + idCom, {responseType: 'text' as 'json'}).subscribe((response) => {
      this.deleteCommentMessage = response;
      this.getCommentsByItemId();
    });
  }

  getAllComments() {
    this.http.get('https://collector-fed.herokuapp.com/comments/allcomments').subscribe((response) => {
      this.allComments = response;
    });
  }

  getCommentsByItemId() {
    const idCollection = localStorage.getItem('itemId');
    this.http.get('https://collector-fed.herokuapp.com/comments/getcommentsbyitemid?itemId=' + idCollection).subscribe((response) => {
      this.allCommentsByItemId = response;
      this.getCommentsUsersNamesByItemId();
    });
  }

  getCommentsUsersNamesByItemId() {
    const itemId = localStorage.getItem('itemId');
    this.http.get('https://collector-fed.herokuapp.com/comments/getusersnamesbyitem?itemId=' + itemId).subscribe((response) => {
      this.commentsUsersNamesByItemId = response;
    });
  }

  createNewItem(tags) {
    if (this.topic === 'badges'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), material: this.material,
        badgesKind: this.badgesKind, fastening: this.fastening, tagsName: tags, picture: this.picture
      };
      this.http.post('https://collector-fed.herokuapp.com/collection/createbadges', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.createItemMessage = response;
      });
    }
    if (this.topic === 'books'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), author: this.author,
        pages: this.pages, publishingHouse: this.publishingHouse, tagsName: this.tags, picture: this.picture
      };
      this.http.post('https://collector-fed.herokuapp.com/collection/createbooks', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.createItemMessage = response;
      });
    }
    if (this.topic === 'coins'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), coinsKind: this.coinsKind,
        size: this.size, metal: this.metal, tagsName: this.tags, picture: this.picture
      };
      this.http.post('https://collector-fed.herokuapp.com/collection/createcoins', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.createItemMessage = response;
      });
    }
    if (this.topic === 'stamps'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), perforation: this.perforation,
        value: this.value, color: this.color, tagsName: this.tags, picture: this.picture
      };
      this.http.post('https://collector-fed.herokuapp.com/collection/createstamps', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.createItemMessage = response;
      });
    }
    if (this.topic === 'wine'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), alcohol: this.alcohol,
        sugar: this.sugar, wineKind: this.wineKind, tagsName: this.tags, picture: this.picture
      };
      this.http.post('https://collector-fed.herokuapp.com/collection/createwine', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.createItemMessage = response;
      });
    }
  }
  setItemsUserName(name){
    localStorage.removeItem('itemsUserName');
    this.itemsUserName = name;
    localStorage.setItem('itemsUserName', name);
  }
  updateNewItem(tags) {
    if (this.topic === 'badges'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), material: this.material,
        badgesKind: this.badgesKind, fastening: this.fastening, tagsName: tags, picture: this.picture, collectionId: this.collectionId,
        badgesId: this.badgesId
      };
      this.http.put('https://collector-fed.herokuapp.com/collection/updatebadges', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.updateItemMessage = response;
      });
    }
    if (this.topic === 'books'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), author: this.author,
        pages: this.pages, publishingHouse: this.publishingHouse, tagsName: this.tags, picture: this.picture,
        collectionId: this.collectionId, booksId: this.booksId
      };
      this.http.put('https://collector-fed.herokuapp.com/collection/updatebooks', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.updateItemMessage = response;
      });
    }
    if (this.topic === 'coins'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), coinsKind: this.coinsKind,
        size: this.size, metal: this.metal, tagsName: this.tags, picture: this.picture, collectionId: this.collectionId,
        coinsId: this.coinsId
      };
      this.http.put('https://collector-fed.herokuapp.com/collection/updatecoins', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.updateItemMessage = response;
      });
    }
    if (this.topic === 'stamps'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), perforation: this.perforation,
        value: this.value, color: this.color, tagsName: this.tags, picture: this.picture, collectionId: this.collectionId,
        stampsId: this.stampsId
      };
      this.http.put('https://collector-fed.herokuapp.com/collection/updatestamps', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.updateItemMessage = response;
      });
    }
    if (this.topic === 'wine'){
      const body = {
        name: this.name, topic: this.topic, cost: this.cost, info: this.info,
        country: this.country, release: this.release, userName: localStorage.getItem('itemsUserName'), alcohol: this.alcohol,
        sugar: this.sugar, wineKind: this.wineKind, tagsName: this.tags, picture: this.picture, collectionId: this.collectionId,
        wineId: this.wineId
      };
      this.http.put('https://collector-fed.herokuapp.com/collection/updatewine', body, {responseType: 'text' as 'json'}).subscribe((response) => {
        this.updateItemMessage = response;
      });
    }
  }

  deleteItem(id) {
    this.http.delete('https://collector-fed.herokuapp.com/collection/deleteitem/' + id, {
      responseType: 'text' as 'json'
    }).subscribe((response) => {
      this.deleteMessage = response;
    });
  }
}

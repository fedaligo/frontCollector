import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Items} from './entity/items';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  value = '';
  public tagsByItemId: any;
  public searchedWord: string;
  public searchedId: bigint;
  public response: any = this.findInfoByWord(localStorage.getItem('word'));
  public response1:any = this.findItemById(localStorage.getItem('itemId'));
  public responseFindAll: any;
  public responseFindItemsByTopicAndUserName: any = this.findItemByTopicAndUserName(localStorage.getItem('topic'),
    localStorage.getItem('username'));
  public responseFindCollectionsByUserName: any = this.findCollectionsByUserName();
  public responseFindItemsByUserName: any = this.findItemsByUserName();
  public responseFindItemsOfAnotherUserName: any = this.findItemsOfAnotherUserName(localStorage.getItem('anotherUserName'));
  public columns: string[] = ['Topic:', 'Cost:', 'Country:', 'Release:', 'Info:', 'Owner:'];
  public badges: string[] = ['Material:', 'Kind:', 'Fastening:'];
  public books: string[] = ['Author:', 'Pages:', 'Publishing house:'];
  public coins: string[] = ['Kind:', 'Size:', 'Metal:'];
  public stamps: string[] = ['Perforation:', 'Value:', 'Color:'];
  public wine: string[] = ['Alcohol:', 'Sugar:', 'Kind:'];
  public tagsNames: string[];
  constructor(private http: HttpClient) {}
  findInfoByWord(word){
    if (localStorage.getItem('word') !== null) {
      localStorage.removeItem('word');
    }
    localStorage.setItem('word', word);
    this.http.get('https://collector-fed.herokuapp.com/collection/itembyword/' + localStorage.getItem('word')).subscribe((response) => {
      this.response = response;
    });
  }
  findItemById(itemId){
    if (localStorage.getItem('itemId') !== null){
      localStorage.removeItem('itemId');
    }
    localStorage.setItem('itemId', itemId);
    this.http.get('https://collector-fed.herokuapp.com/collection/finditem/' + localStorage.getItem('itemId')).subscribe((response) => {
      this.response1 = response;
    });
  }
  findAllItem(){
    this.http.get('https://collector-fed.herokuapp.com/collection/allitems').subscribe((response) => {
      this.responseFindAll = response;
    });
  }
  findItemByTopicAndUserName(topic, username){
    if (localStorage.getItem('username') !== null){
      localStorage.removeItem('username');
      localStorage.removeItem('topic');
    }
    localStorage.setItem('username', username);
    localStorage.setItem('topic', topic);
    this.http.get('https://collector-fed.herokuapp.com/collection/itemsofcollections?topic=' +
      localStorage.getItem('topic') + '&username=' + localStorage.getItem('username'))
      .subscribe((response) => {
      this.responseFindItemsByTopicAndUserName = response;
    });
  }
  findCollectionsByUserName(){
    this.http.get('https://collector-fed.herokuapp.com/collection/allcollectionsbyuser?username=' + localStorage.getItem('currentUser'))
      .subscribe((response) => {
      this.responseFindCollectionsByUserName = response;
    });
  }

  findItemsByUserName(){
    this.responseFindItemsOfAnotherUserName = null;
    this.http.get('https://collector-fed.herokuapp.com/collection/allitemsbyuser?username=' + localStorage.getItem('currentUser'))
      .subscribe((response) => {
        this.responseFindItemsByUserName = response;
      });
  }

  findItemsOfAnotherUserName(userName){
    localStorage.setItem('anotherUserName', userName);
    this.http.get('https://collector-fed.herokuapp.com/collection/allitemsbyuser?username=' + userName)
      .subscribe((response) => {
        this.responseFindItemsOfAnotherUserName = response;
      });
  }
  getAnotherUserName(){
    return localStorage.getItem('anotherUserName');
  }
  findTagsNames(){
    this.http.get<string[]>('https://collector-fed.herokuapp.com/tags/tagsnames?id=' + localStorage.getItem('itemId'))
      .subscribe((response: string[]) => {
        this.tagsNames = response;
      });
  }
  findTagsIdByItemId(){
    this.http.get<number[]>('https://collector-fed.herokuapp.com/tags/tagsidbyitemid?id=' + localStorage.getItem('itemId'))
      .subscribe((response) => {
        this.tagsByItemId = response;
      });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  value = '';
  public searchedWord: string;
  public searchedId: bigint;
  public response: any;
  public response1: any;
  constructor(private http: HttpClient) {}
  findInfoByWord(word){
    this.http.get('http://localhost:5000/itembyword/' + word).subscribe((response) => {
      this.response = response;
      this.searchedWord = word;
    });
  }
  findItemById(id){
    this.http.get('http://localhost:5000/finditem/' + id).subscribe((response) => {
      this.response1 = response;
      this.searchedId = id;
    });
  }
}

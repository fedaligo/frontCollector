import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Collection} from './entity/collection';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontCollector';

  collection: Collection[];
  displayedColumns: string[] = ['id', 'picture'];

  constructor(private http: HttpClient) {
    this.http.get<Collection[]>('http://localhost:5000/task').subscribe(result => {
      // вызов RESTful сервиса и запись результата в переменную
      this.collection = result;
      console.log(result[0]);
    });
  }

}


import {Component, OnInit} from '@angular/core';
import {Tile} from '../main/main.component';
import {SearchServiceService} from '../search-service.service';
import {Tags} from '../entity/tags';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent {
  tiles: Tile[] = [
    {cols: 7, rows: 1},
    {cols: 1, rows: 1}
  ];
  displayedColumns: string[] = ['column', 'info'];
  displayedColumns1: string[] = [ 'data', 'comment', 'button'];
  comment: any;
  constructor(public svc: SearchServiceService, public service: RestapiService) {
    svc.findTagsNames();
    service.isOwnerOrAdmin();
    service.isHaveLike();
    service.getCommentsByItemId();
    service.ownerName();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.svc.tagsNames, event.previousIndex, event.currentIndex);
  }
  addComment(){
    this.service.addComment(this.comment);
    this.comment = '';
  }
}

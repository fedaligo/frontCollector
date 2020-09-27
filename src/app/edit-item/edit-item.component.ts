import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {@ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  cloudinaryResponse: any;
  numberPatern = '^[0-9]+$';
  latinPatern = '^[a-zA-Z0-9\\s]+$';
  formControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.latinPatern),
  ]);
  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.latinPatern),
  ]);
  pictureFormControl = new FormControl('', [
    Validators.required,
  ]);
  topic: any;
  options: string[] = ['badges', 'books', 'coins', 'stamps', 'wine'];
  picture: File;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  myTags: string[] = this.svc.tagsNames;
  allTags: string[] ;

  constructor(private http: HttpClient, public svc: SearchServiceService, public service: RestapiService) {
    svc.findTagsNames();
    this.http.get('https://collector-fed.herokuapp.com/tags/alltagsnames').subscribe((response: string[]) => {
      this.allTags = response;
    });
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    this.createInput();
    service.ownerName();
  }

  onFileSelected(event) {
    this.picture = event.target.files[0];
  }
  onUpload(){
    const body = new FormData();
    body.append('file', this.picture);
    body.append('upload_preset', 'front-collector');
    body.append('cloud_name', 'hgqm1kjn8');
    this.http.post('https://api.cloudinary.com/v1_1/hgqm1kjn8/image/upload', body).subscribe(response => {
      this.cloudinaryResponse = response;
      this.service.picture = this.cloudinaryResponse.secure_url;
    });
  }
  createInput() {
    this.service.itemsUserName = this.service.ownerUserName;
    this.service.collectionId = this.svc.response1.id;
    this.service.topic = this.svc.response1.topic;
    this.service.name = this.svc.response1.name;
    this.service.cost = this.svc.response1.cost;
    this.service.info = this.svc.response1.info;
    this.service.country = this.svc.response1.country;
    this.service.release = this.svc.response1.release;
    this.service.tags = this.svc.tagsNames;
    this.myTags = this.svc.tagsNames;
    this.service.picture = this.svc.response1.picture;
    if (this.svc.response1.topic === 'badges'){
      this.service.badgesId = this.svc.response1.badges[0].id;
      this.service.material = this.svc.response1.badges[0].material;
      this.service.badgesKind = this.svc.response1.badges[0].kind;
      this.service.fastening = this.svc.response1.badges[0].fastening;
    }
    if (this.svc.response1.topic === 'books'){
      this.service.booksId = this.svc.response1.books[0].id;
      this.service.author = this.svc.response1.books[0].author;
      this.service.pages = this.svc.response1.books[0].pages;
      this.service.publishingHouse = this.svc.response1.books[0].publishingHouse;
    }
    if (this.svc.response1.topic === 'coins'){
      this.service.coinsId = this.svc.response1.coins[0].id;
      this.service.coinsKind = this.svc.response1.coins[0].kind;
      this.service.size = this.svc.response1.coins[0].size;
      this.service.metal = this.svc.response1.coins[0].metal;
    }
    if (this.svc.response1.topic === 'stamps'){
      this.service.stampsId = this.svc.response1.stamps[0].id;
      this.service.perforation = this.svc.response1.stamps[0].perforation;
      this.service.value = this.svc.response1.stamps[0].value;
      this.service.color = this.svc.response1.stamps[0].color;
    }
    if (this.svc.response1.topic === 'wine'){
      this.service.wineId = this.svc.response1.wine[0].id;
      this.service.alcohol = this.svc.response1.wine[0].alcohol;
      this.service.sugar = this.svc.response1.wine[0].sugar;
      this.service.wineKind = this.svc.response1.wine[0].kind;
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.myTags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.tagsCtrl.setValue(null);
  }
  remove(tag: string): void {
    const index = this.myTags.indexOf(tag);

    if (index >= 0) {
      this.myTags.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.myTags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  updateNewItem(){
    this.service.tags = this.myTags;
    this.service.updateNewItem(this.service.tags);
  }
  ngOnInit(): void {
  }
}

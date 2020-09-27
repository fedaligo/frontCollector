import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SearchServiceService} from '../search-service.service';
import {RestapiService} from '../restapi.service';
import {Items} from '../entity/items';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  item: Items;
  tags: any;
  userName: any;
  badges: any;
  books: any;
  coins: any;
  stamps: any;
  wine: any;
  cloudinaryResponse: any;
  numberPatern = '^[0-9]+$';
  latinPatern = '^[a-zA-Z0-9\\s]+$';
  latinFormControl = new FormControl('', [
    Validators.pattern(this.latinPatern),
  ]);
  formControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.latinPatern),
  ]);
  numberFormControl = new FormControl('', [
    Validators.pattern(this.numberPatern),
  ]);
  topicFormControl = new FormControl('', [
    Validators.required,
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
  myTags: string[] = [ ];
  allTags: string[] ;

  constructor(private http: HttpClient, public svc: SearchServiceService, public service: RestapiService) {
    this.http.get('https://collector-fed.herokuapp.com/tags/alltagsnames').subscribe((response: string[]) => {
      this.allTags = response;
    });
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    this.cleanInput();
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
  cleanInput() {
    this.service.name = '';
    this.service.cost = 0;
    this.service.info = '';
    this.service.country = '';
    this.service.release = 2020;
    this.service.tags = [];
    this.myTags = [];
    this.service.picture = '';
    this.service.material = '';
    this.service.badgesKind = '';
    this.service.fastening = '';
    this.service.author = '';
    this.service.pages = 0;
    this.service.publishingHouse = '';
    this.service.coinsKind = '';
    this.service.size = 0;
    this.service.metal = '';
    this.service.perforation = 'false';
    this.service.value = 0;
    this.service.color = '';
    this.service.alcohol = 0;
    this.service.sugar = 0;
    this.service.wineKind = '';

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our tag
    if ((value || '').trim()) {
      this.myTags.push(value.trim());
    }
    // Reset the input value
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
  createNewItem(){
    this.service.tags = this.myTags;
    this.service.createNewItem(this.service.tags);
  }
  ngOnInit(): void {
  }
}

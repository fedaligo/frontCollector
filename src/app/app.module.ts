import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatListModule} from '@angular/material/list';
import { MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';

import { Routes, RouterModule} from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignComponent } from './sign/sign.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ShowItemComponent } from './show-item/show-item.component';

import { SearchServiceService} from './search-service.service';
import { RestapiService} from './restapi.service';
import { AllCollectionsComponent } from './all-collections/all-collections.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { MyCollectionsComponent } from './my-collections/my-collections.component';
import { ItemsComponent } from './items/items.component';
import { SettingsComponent } from './settings/settings.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ShowUserProfileComponent } from './show-user-profile/show-user-profile.component';
import { ShowAnotherUserProfileComponent } from './show-another-user-profile/show-another-user-profile.component';
import { AboutComponent } from './about/about.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { MatRadioModule} from '@angular/material/radio';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';


const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'rdr', redirectTo: 'sign', pathMatch: 'full'},
  { path: 'sign', component: SignComponent},
  { path: 'searchitems', component: SearchListComponent},
  { path: 'showitem', component: ShowItemComponent},
  { path: 'allitems', component: AllItemsComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'editprofile', component: EditProfileComponent},
  { path: 'showuserprofile', component: ShowUserProfileComponent},
  { path: 'editanotherprofile', component: ShowAnotherUserProfileComponent},
  { path: 'mycollections', component: MyCollectionsComponent},
  { path: 'myitems', component: MyItemsComponent},
  { path: 'items', component: ItemsComponent},
  { path: 'createitem', component: CreateItemComponent},
  { path: 'edititem', component: EditItemComponent},
  { path: 'allcollections', component: AllCollectionsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MainComponent,
    SignComponent,
    SearchListComponent,
    ShowItemComponent,
    AllCollectionsComponent,
    AllItemsComponent,
    MyItemsComponent,
    MyCollectionsComponent,
    ItemsComponent,
    SettingsComponent,
    RegistrationComponent,
    EditProfileComponent,
    ShowUserProfileComponent,
    ShowAnotherUserProfileComponent,
    AboutComponent,
    EditItemComponent,
    CreateItemComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatSliderModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        CdkTableModule,
        MatSlideToggleModule,
        FormsModule,
        MatInputModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule,
        MatChipsModule,
        RouterModule.forRoot(appRoutes),
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatRadioModule,
      CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'hgqm1kjn8',
      upload_preset: 'front-collector'}),
    ],
  providers: [
    SearchServiceService,
    RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

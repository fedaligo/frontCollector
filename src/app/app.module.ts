import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CdkTableModule } from '@angular/cdk/table';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

import {Routes, RouterModule} from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignComponent } from './sign/sign.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ShowItemComponent } from './show-item/show-item.component';

import {SearchServiceService} from './search-service.service';
import { RestapiService} from './restapi.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'rdr', redirectTo: 'sign', pathMatch: 'full'},
  { path: 'sign', component: SignComponent},
  { path: 'searchitems', component: SearchListComponent},
  { path: 'showitem', component: ShowItemComponent},
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MainComponent,
    SignComponent,
    SearchListComponent,
    ShowItemComponent
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
    MatCardModule
  ],
  providers: [
    SearchServiceService,
    RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

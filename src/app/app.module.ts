import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent
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
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

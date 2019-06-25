import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ErrorsModule } from './pages/errors/errors.module';
import { CoreModule } from './core/core.module';
import { InitializeComponent } from './pages/initialize/initialize.component';
import {environment} from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    InitializeComponent,
  
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ErrorsModule,
    AngularFireModule.initializeApp(environment.firebaseCredentials),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

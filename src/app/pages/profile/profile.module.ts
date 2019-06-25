import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  WavesModule } from 'angular-bootstrap-md';
import { ChartsModule } from 'ng2-charts';

//to display data
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ChartsComponent } from './charts/charts.component';
import { FormbuttonComponent } from './formbutton/formbutton.component';
import {environment} from 'src/environments/environment';

//pop up form
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomselectComponent } from './customselect/customselect.component';


@NgModule({
  declarations: [ProfileComponent, ChartsComponent, FormbuttonComponent,FormModalComponent, CustomselectComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ChartsModule,WavesModule,
   ChartsModule,WavesModule,
    AngularFireModule.initializeApp(environment.firebaseCredentials),
    AngularFirestoreModule.enablePersistence(),
   NgbModule.forRoot(),
   FormsModule,
   ReactiveFormsModule

    
  ],
  
  entryComponents: [
    FormModalComponent
  ]
})
export class ProfileModule { 
  
}

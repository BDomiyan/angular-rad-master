import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';

export interface user {
  user_id: string;
  name: string; // name of the user
  email: string; // email address of the user
  is_anonymous: boolean; // true if user has not yet signed up (guest)
  picture?: string; // url of profile picture
}


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})


export class FormModalComponent {
  id_current=this.authService.userId;
  @Input()id: number;
  myForm: FormGroup;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   public afAuth: AngularFireAuth,private userService: UserService, private authService: AuthService,db: AngularFirestore,private afs: AngularFirestore
  ) {
    this.createForm();
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      username: ''
    });
  }

  model = { username:''};
  private submitForm() {
    
   var usersRef = this.afs.collection("users");


    usersRef.doc(this.id_current).update({
     username:this.model.username,});
     
    
      this.activeModal.close(this.myForm.value);
  }
}
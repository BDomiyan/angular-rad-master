import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import {Observable} from 'rxjs';



import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

//for pop up form

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './form-modal/form-modal.component';

export interface user {
  user_id: string;
  name: string; // name of the user
  email: string; // email address of the user
  is_anonymous: boolean; // true if user has not yet signed up (guest)
  picture?: string; // url of profile picture
}

export interface statistics{
  user_id:String;
  name:String;
  overall_WPM:Number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  [x: string]: any;

  ngOnInit() {
    this.userService.getCurrentUser();
   }

   signIn() {
    this.authService.signInWithGoogle();
  }
  

   
   id=this.authService.userId;
   name_view:string;
   email_view:string;
   picture_view:string;


  UserCollectionRef: AngularFirestoreCollection<user>;
  user$: Observable<user[]>;
 
   //for rank
  itemDoc: AngularFirestoreDocument<statistics>;
  stats:Observable<statistics>;
 
 
  constructor(public afAuth: AngularFireAuth,private userService: UserService, private authService: AuthService,db: AngularFirestore,private afs: AngularFirestore, private modalService: NgbModal ) {
    this.UserCollectionRef = this.afs.collection<user>('users');
    this.user$ = this.UserCollectionRef.valueChanges();
     
    this.afAuth.authState.subscribe(user => {
      this.name_view=user.displayName;
      this.email_view=user.email;
      this.picture_view=user.photoURL;
      })

   //rank()
   
  this.itemDoc = afs.doc<statistics>('statistics/top-users');
  this.stats = this.itemDoc.valueChanges();
    
  }
  

 
  
  openFormModal() {
    const modalRef = this.modalService.open(FormModalComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}


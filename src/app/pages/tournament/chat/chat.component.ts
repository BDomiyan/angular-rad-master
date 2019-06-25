import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/core/chat.service';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/core/user.service';
import { Message } from 'src/app/core/models/message';
import { User } from 'src/app/core/models/user';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  currentUser: User;
  subscriptions: Subscription[] = [];

  msgList = [];
  msgListReverse = [];
  thisUserId = "";

  tournamentId = "36XNEUaAMfGhD9xc4iQ2";

  constructor(private userService: UserService, private chatService: ChatService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.getMessages();
    this.showAllMsgs();
    this.subscriptions.push(this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.thisUserId = user.user_id;
    }));
  }

  ngOnDestroy(): void {
    for(let subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }

  getMessages() {
    let chatCollection = this.firestore
      .collection('tournaments')
      .doc(this.tournamentId)
      .collection('messages', ref => ref.orderBy('created_at'));


    chatCollection.snapshotChanges().forEach(items => {
      this.msgList = [];
      items.forEach(item => {
        this.msgList.push(item.payload.doc.data());
      });
    });
  }

  submitMsg(msg: string) {
    const message = new Message();
    message.sender_id = this.currentUser.user_id;
    message.sender_name = this.currentUser.name;
    message.text = msg;
    message.updated_at = Date.now();

    console.log('upto this point', this.tournamentId);
    const messageRef = this.firestore.collection(`tournaments/${this.tournamentId}/messages`).doc(Date.now().toString());
    message.message_id = messageRef.ref.id;
    console.log('message ref', messageRef);
    messageRef.set({...message});
  }

  showAllMsgs(){
    let chatCollection = this.firestore.collection(`tournaments/${this.tournamentId}/messages`); 
    chatCollection.snapshotChanges().forEach( items => {
      this.msgList = [];
      items.forEach( item => {
        this.msgList.push(item.payload.doc.data());
        });
      });
  
    }
  
}

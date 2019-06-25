import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from, of, iif, BehaviorSubject } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';
import { Logger } from '../utils/logger';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  onAuthStateChange() {
    return this.afAuth.authState.pipe(map(x => !!x));
  }

  signInAnonymous() {
    Logger.log('Signing in as an anonymous user');
    return from(this.afAuth.auth.signInAnonymously()).pipe(
      tap(x => Logger.log('Signed in as an anonymous user', x)),
    );
  }

  signInWithGoogle() {
    Logger.log('Signing in with Google account now');
    let user: User = null;

    return from(
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      tap(x => Logger.log('Signed in with google', x)),
      tap(x => {
        // setting the user object
        user = {
          email: x.user.email,
          is_anonymous: false,
          name: x.user.displayName,
          user_id: x.user.uid,
          picture: x.user.photoURL,
        };
      }),
      mergeMap(x => {
        Logger.log('Querying the db for current user');
        return this.db.collection('users', ref => ref.where('user_id', '==', user.user_id)).get();
      }),
      tap((x) => Logger.log('Firestore result', x)),
      mergeMap((x) => iif(() => x.empty,
        of(this.db.collection('users').doc(user.user_id).set(user)),
        of(this.db.collection('users').doc(user.user_id).update(user)),
      )),
      map(() => user),
    );
  }

  signOut() {
    return from(
      this.afAuth.auth.signOut()
    ).pipe(
      tap(() => {
        this.router.navigate(['/initialize']);
      }),
    );
  }

  isSignedIn() {
    return this.afAuth.authState.pipe(
      map((user) => !!user),
    );
  }

  get userId() {
    return this.afAuth.auth.currentUser.uid;
  }

  get isAnonymous() {
    return this.afAuth.auth.currentUser.isAnonymous;
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './models/user';
import { take, map, mergeMap, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, iif, empty, EMPTY } from 'rxjs';
import { Logger } from '../utils/logger';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    // initializing the subject
    this.currentUserSubject = new BehaviorSubject({
      user_id: null,
      email: 'guest@typr.com',
      is_anonymous: true,
      name: 'Guest',
    });

    this.authService.onAuthStateChange().pipe(
      mergeMap((authenticated) => {
        if (authenticated) {
          return this.getCurrentUserInternal();
        }
        return EMPTY;
      }),
    ).subscribe((user) => {
      Logger.log('user state changed', { user });
      this.currentUserSubject.next(user);
    });
  }

  private getCurrentUserInternal(): Observable<User> {
    if (this.authService.isAnonymous) {
      return of({
        user_id: this.authService.userId,
        email: 'guest@typr.com',
        is_anonymous: true,
        name: 'Guest',
      });
    }

    // user is not an anonymous user, and has a record on db
    return this.db.collection('users').doc(this.authService.userId).get().pipe(
      take(1),
      map((snapshot) => {
        return snapshot.data() as User;
      }),
    );
  }

  // subscribe to this observable, to get the currently logged in user's information
  public getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  userName: string;
  isSignedIn: boolean;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.userName = user.name;
    });

    this.authService.isSignedIn().subscribe(signedIn => {
      this.isSignedIn = signedIn;
    });
  }

  signIn() {
    this.authService.signInWithGoogle().subscribe((result) => {
      console.log('signed in', result);
    });
  }

  signOut() {
    this.authService.signOut().subscribe((result) => console.log(result));
  }

}

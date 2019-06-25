import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';
import { iif, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss']
})
export class InitializeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isSignedIn()
      .pipe(
        mergeMap(signedIn => iif(() => !signedIn,
          this.authService.signInAnonymous(),
          of(null),
        ))
      )
      .subscribe(() => {
        console.log('user logged in, navigating home');
        this.router.navigate(['/']);
      });
  }

}

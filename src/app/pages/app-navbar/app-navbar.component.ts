import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ENV } from '../../app.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.component.html',
  styles: []
})
export class AppNavbarComponent implements OnInit {
  user: firebase.User;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.auth.currentUser;
    if (this.user) {
      
      this.saveUser() ;
       router.navigate(['home']);
    }
    else {
      //router.navigate(['phonelogin']);
    }

  }
  saveUser() {
    ENV.loggedIn = true;
    ENV.userPhoneNumber = this.user.phoneNumber;
  }

  ngOnInit() {
  }
  logout() {
    ENV.loggedIn = false;
    this.afAuth.auth.signOut();
  }
}

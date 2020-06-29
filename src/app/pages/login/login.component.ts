import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ENV } from '../../app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  //user: User = { id: 2, name: "kumar" }
  usr: firebase.User;
  category: string;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  Category$: BehaviorSubject<string | null>;
  // listPath: string = 'Shops';
  //public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(private db: AngularFireDatabase, private afauth: AngularFireAuth, private router: Router) {
    // const afList = db.list('Shops');
    // //afList.push({ Description: 'shop', Likes: '9', Title: 'shop', Url: 'shop' });
    // this.listObservable = afList.snapshotChanges();
    // listObservable.subscribe();
    if (afauth.auth) {
      afauth.user.subscribe(auth => { this.usr = auth; this.saveUser() });
    }
    else {
      router.navigate(['phonelogin']);
    }



   
     this.itemsRef = db.list('Shops');
    // // Use snapshotChanges().map() to store the key
    // this.items = this.itemsRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );





    this.Category$ = new BehaviorSubject(null);
    this.items$ = this.Category$.pipe(
      switchMap(Category =>
        db.list('/Shops', ref =>
        Category ? ref.orderByChild('Category').equalTo(this.category) : ref
        ).snapshotChanges()
      )
    );
    this.filterBy(null);
  }
  filterBy(size: string | null) {
    this.Category$.next(size);

  }


  onCategoryChange() {
    // this.itemsRef.query.equalTo(this.category, 'Category');    
  }


  saveUser() {
    ENV.userPhoneNumber = this.usr.phoneNumber;
  }

  ngOnInit() {
    // this.coursesObservable = this.getCourses();
  }
  // getCourses(): Observable<any[]> {
  //   // return this.db.list('/Shops').valueChanges();
  // }
  likeit(shop) {
    console.log("shop.key");
    console.log(shop.key);
    console.log(shop.payload.val().Likes);
     var likes = shop.payload.val().Likes;
     this.itemsRef.update(shop.key, { Likes: likes + 1 })
    // // console.log(key);
  }

  bookmarkit(shop) {
    //alert(key.key);
    console.log(shop);
    var likes = shop.Likes;
    const bookmarkRef = this.db.list("Shops")
    let keyNow = bookmarkRef.push(this.usr).key
    bookmarkRef.update(shop.key, { User: this.usr })
    // console.log(key);
  }
  // signIn(phoneNumber: number){
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+" + phoneNumber;
  //   firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then( confirmationResult => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       let prompt = this.alertCtrl.create({
  //       title: 'Enter the Confirmation code',
  //       inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //       buttons: [
  //         { text: 'Cancel',
  //           handler: data => { console.log('Cancel clicked'); }
  //         },
  //         { text: 'Send',
  //           handler: data => {
  //             confirmationResult.confirm(data.confirmationCode)
  //               .then(function (result) {
  //                 // User signed in successfully.
  //                 console.log(result.user);
  //                 // ...
  //               }).catch(function (error) {
  //                 // User couldn't sign in (bad verification code?)
  //                 // ...
  //               });
  //           }
  //         }
  //       ]
  //     });
  //     prompt.present();
  //   })
  //   .catch(function (error) {
  //     console.error("SMS not sent", error);
  //   });

  // }

}
export interface User { id: number, name: string };

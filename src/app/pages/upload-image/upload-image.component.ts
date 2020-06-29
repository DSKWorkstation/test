import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { url } from 'inspector';
import { ENV } from '../../app.constant';
//import { Router } from 'parse';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  title: string = "";
  imageUrl: string = "";
  description: string = "";
  category: string = "default";
  filePath: string = "";
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  files: FileList;
  userPhoneNumber: string;
  usr: firebase.User;
  constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase, private afauth: AngularFireAuth, private router: Router) {

    if (afauth.auth) {
      afauth.user.subscribe(auth => {
        this.usr = auth; this.saveUser();
        this.itemRef = db.object('Shops/' + this.usr.phoneNumber);
        this.item = this.itemRef.valueChanges();
      });
    }
    else {
      router.navigate(['phonelogin']);
    }

  }

  ngOnInit() {
  }
  saveUser() {

    ENV.userPhoneNumber = this.usr.phoneNumber;

  }
  save() {
    this.itemRef.set({ Description: this.description });
    this.itemRef.update({ Title: this.title });
    this.itemRef.update({ Url: this.imageUrl });
    this.itemRef.update({ Likes: 0 });
    this.itemRef.update({ Category: this.category })
  }
  delete() {
    this.itemRef.remove();
  }
  getFiles(event) {
    this.files = event.target.files;
  }

  upload() {

    const file = this.files[0];
    this.filePath = file.name;
    var metadata = {
      contentType: 'image',
      cacheControl: "public, max-age=31536000",
    };
    const fileRef = this.afStorage.ref(this.filePath);

    const task = this.afStorage.upload(this.filePath, file);
    this.uploadProgress = task.percentageChanges();

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => { this.imageUrl = url; this.save(); });

      })
    )
      .subscribe();

  }
}

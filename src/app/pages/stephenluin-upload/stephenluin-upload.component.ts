import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Router } from '@angular/router';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';

// import { Observable } from 'rxjs';

// declare var firebase: any;

// interface Image {
//     path: string;
//     filename: string;
//     downloadURL?: string;
//     $key?: string;
// }

@Component({
  selector: 'app-stephenluin-upload',
  templateUrl: './stephenluin-upload.component.html',
  styleUrls: ['./stephenluin-upload.component.css']
})
export class StephenluinUploadComponent implements OnInit {
  /**
     * The name of the folder for images
     * eg. posts/angular-is-awesome
     */
  // @Input() folder: string;

  // fileList : FirebaseListObservable<Image[]>;
  // imageList : Observable<Image[]>;

  itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private router: Router) {

    this.itemsRef = db.list('Shops');

  }
  ngOnInit() {

  }


}

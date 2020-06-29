import { Component, OnInit } from '@angular/core';
import { ParseService } from '../../parse.service';

//-const Parse: any = require('parse');
import * as moment from 'moment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  // const Parse: any = require('parse');

  title = 'My First Angular App!';
  Results: any = [];

  constructor(public parseProvider: ParseService) {
    console.log('Initiated componet');
    //this.GetonConsole();
    this.listScores();



  }

  ngOnInit() {
  }

  public listScores() {
    //let offset = this.Results.length;
    let limit = 100;
    this.parseProvider.getGameScores(limit).then(gameScores => {
      this.Results = gameScores;
     // alert(gameScores.length);
      console.log(gameScores);
    }, (error) => {

    });;

  }
}

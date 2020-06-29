import { Injectable } from '@angular/core';
// Parse
import Parse = require('parse');
// Constants
import { ENV } from './app.constant';

import './external.js'

//declare var myExtObject: any;
//declare var webGlObject: any;

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;
  private masterKey: string = ENV.masterKey;

  private collection: Parse.Collection<Object>;
  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
    //webGlObject.init();
  }

  public getAreeas(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        //myExtObject.func1(resolve, reject);

      }, 500);
    });
  }
  public getAreas() {

    const GameScore = Parse.Object.extend('AutoEstimate');
    let query = new Parse.Query(GameScore);

    // query.skip(offset);
    query.limit(10);
    var date = new Date();
    const pipeline = { group: { $objectId: "$auto_estimate" } }
    date.setMonth(1);
    // query.greaterThanOrEqualTo("CreatedAt", date)
    query.aggregate(pipeline);


    //  myExtObject.func2();
    // = new TestCollection();
    this.collection = query.collection();


    console.log(this.collection);
  }
  public getGameScores(limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const GameScore = Parse.Object.extend('AutoRequest');
        let query = new Parse.Query(GameScore);

        // query.skip(offset);
        query.limit(limit);
        var date = new Date();
        date.setDate(date.getDate() - 2);
        query.include('driver');
        query.include('drop_location');
        query.include('pickup_location');
        console.log(date);
        //const pipeline = {group: {objectId :"$auto_estimate"}}
        //date.setMonth(1);
        query.greaterThan("createdAt", date);
        query.descending('createdAt');
        //query.aggregate(pipeline);
        query.find().then(gameScores => {
          resolve(gameScores);
          console.log(gameScores);

        }, (error) => {
          reject(error);
        });
      }, 500);
    });


  }

  public addGameScore(newScore): Promise<any> {
    const GameScore = Parse.Object.extend('GameScore');

    let gameScore = new GameScore();
    gameScore.set('score', parseInt(newScore.score));
    gameScore.set('playerName', newScore.playerName);
    gameScore.set('cheatMode', false);

    return gameScore.save(null, {
      success: function (gameScore) {
        console.log(gameScore);
        return gameScore;
      },
      error: function (gameScore, error) {
        console.log(error);
        return error;
      }
    });
  }

  private parseInitialize() {
    Parse.initialize(this.parseAppId);
    Parse.serverURL = this.parseServerUrl;
    Parse.masterKey = this.masterKey;
  }


}

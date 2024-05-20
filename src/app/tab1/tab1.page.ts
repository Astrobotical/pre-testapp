import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}
  userName : String = "Joseph";
  userYearlyGoal : number = 250;
  userMiles : number = 150;
  userPercentage : number = 150/250 * 100;
  getPreviousRuns(){
    
  }
  setGoal(){

  }
  setWristband(){

  }
  setUserDailyFeat(){

  }
  
  upload(){}
  userWristband : String = "Fitbit";
}

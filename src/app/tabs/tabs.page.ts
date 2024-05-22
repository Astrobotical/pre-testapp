import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome, faWalking,faUser} from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  faHome = faHome;
  faWalking = faWalking;
  faUser = faUser;
  tab:number  = 1;
  loggedInUser:User = new User(0, "", "", "", "", "", 0, 0);
  constructor(private navCtrl:NavController,private router:Router,private route:ActivatedRoute,private sharedService :SharedService) {
    this.route.queryParams.subscribe(params => {
      if (params && params['user']) {
        this.loggedInUser = JSON.parse(params['user']);
        this.sharedService.setData('user',this.loggedInUser);
       // console.log(params['user']);
      }
    }
    );
  }
   logout(){
    console.log('Logout function called');
  // Perform any necessary logout logic here

  console.log('Navigating to login page');
  // Clear navigation stack and navigate to login page
  this.router.navigate(['/login'], { replaceUrl: true }).then(success => {
    console.log('Navigation to login successful:', success);
  }).catch(error => {
    console.error('Navigation to login failed:', error);
  });
  }
  isTabActive(tab: number){
    switch(tab){
      case 1:
        this.tab = 1;
        break;
      case 2:
        this.tab = 2;
        break;
      case 3:
        this.tab = 3;
        break;
        case 4:
          this.tab = 4;
          break;
      default:
        return false;
    }
    return true; // Add this line to return a value for all code paths
  }

}

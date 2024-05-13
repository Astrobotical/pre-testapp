import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faWalking,faUser} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  faHome = faHome;
  faWalking = faWalking;
  faUser = faUser;
  
  constructor(private router:Router) {}

  logout(){
    this.router.navigate(['login']);
    console.log('logout method called');
  }

}

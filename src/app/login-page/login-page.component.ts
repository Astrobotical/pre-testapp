import { RequestRedirect } from './../../../node_modules/@firebase/auth-compat/node_modules/undici/types/fetch.d';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit  {

  constructor(private router:Router, private storage: StorageService) {
 
  }
  empty(){}
  ngOnInit() {
  //this.checkRememberMe();
  this.empty();
  }
  email: string = "";
  password: string = "";
  showPassword: boolean = false;
  rememberMe: boolean = false;
  wasRemembered: boolean = false;
  togglePassword(){
    this.showPassword = !this.showPassword;
  }
   setPreferences = async () => {
    if(this.rememberMe == true){
      this.rememberMe = false;
    }
    else{
      this.rememberMe = true;
    }

    console.log(`Preference was set,${this.rememberMe}`);
    await this.storage.set('RememberMe', this.rememberMe.toString());
  };
  
   checkRememberMe = async () => {
    const value = await this.storage.get('RememberMe');
    switch (value) {
      case 'true':
        this.wasRemembered = true;
        if(this.wasRemembered == true){
          this.router.navigate(['tabs']);
        } 
        break;
      case 'false':
        this.wasRemembered = false;
        break;
      default:
        this.wasRemembered = false;
        break;
    }
    console.log(`Hello ${value}!`);
  };
  
  removeRememberMe = async () => {
    await this.storage.remove('RememberMe');
  };
  userSignIn(){
    console.log('userSignIn method called'); 
    this.router.navigateByUrl('/tabs');
  }
  userSignUp(){
    console.log('userSignUp method called');
    this.router.navigateByUrl('/signup');
  }
}

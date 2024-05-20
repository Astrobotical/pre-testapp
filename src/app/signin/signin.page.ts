import { DatabaseServiceService } from './../services/database-service.service';
import { RequestRedirect } from './../../../node_modules/@firebase/auth-compat/node_modules/undici/types/fetch.d';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from '../services/storage.service';
import { NativeBiometric, BiometryType } from "capacitor-native-biometric";
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  constructor(private navCtrl:NavController,private router:Router, private storage: StorageService,private datasource:DatabaseServiceService ) {
    this.initGetPreferences();
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
    !this.rememberMe;

    console.log(`Preference was set,${this.rememberMe}`);
    await this.storage.set('RememberMe', this.rememberMe.toString());
  };
  async initGetPreferences(){
    if(await this.storage.get('RememberMe') != ''){
      console.log('was not remembered')
      this.checkRememberMe();
    }else{
      console.log('was  remembered')
      this.rememberMe = true;
      this.wasRemembered = true;
      console.log(`Preference was set,${this.rememberMe}`);
      //this.setPreferences();
    }
  }
   checkRememberMe = async () => {
    const value = await this.storage.get('RememberMe');
    switch (value) {
      case 'true':
        this.wasRemembered = true;
        if(this.wasRemembered == true){
         // this.router.navigate(['tabs']);
        } 
        break;
      case 'false':
        this.wasRemembered = false;
        console.log(`Hello ${value}!`);
        break;
      default:
        this.wasRemembered = false;
        break;
    }
  
  };
  
  removeRememberMe = async () => {
    await this.storage.remove('RememberMe');
  };
  async performBiometricVerificatin(){
    const result = await NativeBiometric.isAvailable();
  
    if(!result.isAvailable) return;
  
    const isFaceID = result.biometryType == BiometryType.FACE_ID;
  
    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Maybe add subtitle here?",
      description: "Maybe a description too?",
    })
      .then(() => this.userSignIn())
      .catch(() => false);
  
    if(!verified) return;
  
    const credentials = await NativeBiometric.getCredentials({
      server: "www.example.com",
    });
  }
  
  // Save user's credentials
  savedCredentials(){
  NativeBiometric.setCredentials({
    username: "username",
    password: "password",
    server: "www.example.com",
  }).then();
}
  
  // Delete user's credentials
  deleteCreds(){
  NativeBiometric.deleteCredentials({
    server: "www.example.com",
  }).then();
  }
  async userSignIn(){
    console.log('userSignIn method called'); 
    let user = new User(0, "", "", "", "", "", 0, 0);
    user.user_Email = this.email;
    user.user_Password = this.password;
    await this.datasource.getUser(user).then
    (user => {
      console.log('User', user);
      const urlParams : NavigationExtras = {
        queryParams: {
          user: JSON.stringify(user)
        }
      };
      this.router.navigate(['/tabs'],urlParams);
    }
  );
  }

  userSignUp(){
    console.log('userSignUp method called');

    this.router.navigateByUrl('/signup');
  }
  userGoback(){
    console.log('userGoback method called');
    this.router.navigateByUrl('/landingpage');
  }
}
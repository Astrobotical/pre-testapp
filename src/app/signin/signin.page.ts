import { DatabaseServiceService } from './../services/database-service.service';
import { RequestRedirect } from './../../../node_modules/@firebase/auth-compat/node_modules/undici/types/fetch.d';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from '../services/storage.service';
import { NativeBiometric, BiometryType } from "capacitor-native-biometric";
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(private navCtrl:NavController,private router:Router, private storage: StorageService,private datasource:DatabaseServiceService,private formBuilder: FormBuilder) {
    this.initGetPreferences();
  }
  ngOnInit() {
    this.signIn = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }
  email: string = "";
  password: string = "";
  showPassword: boolean = false;
  rememberMe: boolean = false;
  wasRemembered: boolean = false; 
  isLoading = false;
  signIn: FormGroup = new FormGroup({});

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
   setPreferences = async () => {
    !this.rememberMe;
    console.log(`Preference was set,${this.rememberMe}`);
    if(this.rememberMe == true){
    await this.storage.set('email', this.email);
    }
    await this.storage.set('RememberMe', this.rememberMe.toString());
  };

  async initGetPreferences(){
    if(await this.storage.get('RememberMe') == ''){
      console.log('was not remembered')
      this.checkRememberMe();
    }else{
      console.log('was remembered')
      this.rememberMe = true;
      //this.wasRemembered = true;
      this.email = await this.storage.get('email');
      console.log(`Preference was set,${this.rememberMe}`);
    }
  }
   checkRememberMe = async () => {
    const value = await this.storage.get('RememberMe');
    switch (value) {
      case 'true':
        this.wasRemembered = true;
        if(this.wasRemembered == true){
          this.rememberMe = true;
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
      reason: "Login without a password",
      title: "Log in",
      subtitle: "Maybe add subtitle here?",
      description: "Maybe a description too?",
    })
      .then(() => this.userBiometricSignIn())
      .catch(() => false);
  
    if(!verified) return;
  
    const credentials = await NativeBiometric.getCredentials({
      server: "www.example.com",
    });
  }
  
  async userSignIn(){
    console.log('userSignIn method called'); 
    let user = new User(0, "", "", "", "", "", 0, 0);
    user.user_Email = this.signIn.get('Email')?.value;
    user.user_Password = this.signIn.get('Password')?.value;
   // console.log('User', user);
    this.isLoading = true;
    if (this.signIn.valid) {
      console.log(this.signIn.value);
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
  
      await this.datasource.getUser(user).then
      (user => {
        console.log('User', user);
        const urlParams : NavigationExtras = {
          queryParams: {
            user: JSON.stringify(user)
          }
        };
        timeout(2000);
        this.router.navigate(['/tabs'],urlParams);
      }
    );
    } else {
      console.log("Form is invalid");
    
      // Print detailed status of each control
      Object.keys(this.signIn.controls).forEach(key => {
        const control = this.signIn.get(key);
        console.log(key + ' status: ' + control?.status);
        console.log(key + ' value: ' + control?.value);
        console.log(key + ' errors: ' + JSON.stringify(control?.errors));
      });
    }
    // Simulate a login process with a delay
    
}
  async userBiometricSignIn(){
   this.datasource.getUserByEmail(this.email).then
    (user => {
      console.log('User', user);
      const urlParams : NavigationExtras = {
        queryParams: {
          user: JSON.stringify(user)
        }
      };
      this.router.navigate(['/tabs'],urlParams);
    });
  }
  userGoback(){
    console.log('userGoback method called');
    this.router.navigateByUrl('/landingpage');
  }
}
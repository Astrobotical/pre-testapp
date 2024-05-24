import { DatabaseServiceService } from './../services/database-service.service';
import { RequestRedirect } from './../../../node_modules/@firebase/auth-compat/node_modules/undici/types/fetch.d';
import { Component, OnInit, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { NativeBiometric, BiometryType } from "capacitor-native-biometric";
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { AlertService } from './../alert.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(private ngZone:NgZone,private alertService: AlertService,private router:Router, private storage: StorageService,private datasource:DatabaseServiceService,private formBuilder: FormBuilder) {
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
  };

  async initGetPreferences(){
    if(await this.storage.get('RememberMe') == '' || await this.storage.get('RememberMe') == 'false'){
      this.rememberMe = false;
      this.wasRemembered = false;
    }
    else if(await this.storage.get('RememberMe') == 'true'){
      console.log('was remembered')
      this.rememberMe = true;
      this.wasRemembered = true;
      this.signIn.get("Email")?.setValue(await this.storage.get('email'));
    }
    console.log(`Preference was set,${this.rememberMe}`);
  }

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
  
  }
  
  async userSignIn(){
    let user = new User(0, "", "", "", "", "", 0, 0,0,0);
    user.user_Email = this.signIn.get('Email')?.value;
    user.user_Password = this.signIn.get('Password')?.value;
    this.isLoading = true;
    await this.alertService.presentSpinner('Signing in ... ');
    if (this.signIn.valid) {
      if(await this.datasource.getUser(user) == undefined){
        this.isLoading = false;
        this.alertService.dismissSpinner();
        this.alertService.failed('User not found');
        return;
      }
      console.log(this.signIn.value);
      setTimeout(() => {
        this.alertService.dismissSpinner();
        this.isLoading = false;
      }, 3000);

    if(this.rememberMe == true){
      await this.storage.set('email', this.signIn.get('Email')?.value);
      await this.storage.set('RememberMe', this.rememberMe.toString());
    }
      await this.datasource.getUser(user).then
      (user => {
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
      this.alertService.dismissSpinner();
    await this.alertService.failed('Invalid email or password');
    this.isLoading = false;
      Object.keys(this.signIn.controls).forEach(key => {
        const control = this.signIn.get(key);
        console.log(key + ' status: ' + control?.status);
        console.log(key + ' value: ' + control?.value);
        console.log(key + ' errors: ' + JSON.stringify(control?.errors));
      });
    }
}
  async userBiometricSignIn(){
    const userEmail = await this.storage.get('email');
    this.datasource.getUserByEmail(userEmail).then
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
    this.router.navigateByUrl('/landingpage');
  }
}
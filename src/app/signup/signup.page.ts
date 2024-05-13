import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage  {
  user: User = new User(0, "", "", "", "", "", 0, 0);
  confirmedPassword: string = "";
  showconfirmPassword: boolean = false;
  constructor(private router : Router) { }
  signup(){
    console.log(this.user.user_FirstName);
    console.log(this.user.user_LastName);
    console.log(this.user.user_Email);
  }

  toggleShowConfirmPassword(){
    this.showconfirmPassword = !this.showconfirmPassword;
  }
  redirectTologin(){
    this.router.navigate(['login']);
    console.log("Redirect to login page");
  }
  submitformData()
  {
    console.log("Form Submitted");
    this.redirectTologin();
  
  }

}

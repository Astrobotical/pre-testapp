import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DatabaseServiceService } from '../services/database-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage  {
  user: User = new User(0, "", "", "", "", "", 0, 0);
  confirmedPassword: string = "";
  showconfirmPassword: boolean = false;
  constructor(private router : Router, private datasource:DatabaseServiceService ) { 
  }
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
 async submitformData()
  {
    this.user.user_Dob = "2021-01-01";
    console.log("Form Submitted");
  
     this.datasource.addUser(this.user);
    // this.datasource.closeConnection();
    //  console.log("User added successfully");
      this.redirectTologin();
   
  
  }

}

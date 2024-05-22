import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DatabaseServiceService } from '../services/database-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage  {
  user: User = new User(0, "", "", "", "", "", 0, 0);
  confirmedPassword: string = "";
  showconfirmPassword: boolean = false;
  signUp:FormGroup = new FormGroup({});
  constructor(private router : Router, private datasource:DatabaseServiceService,private formBuilder: FormBuilder ) { 
  this.signUp = this.formBuilder.group({
    user_FirstName: ['', Validators.required],
      user_LastName: ['', Validators.required],
      user_Email: ['', [Validators.required, Validators.email], [this.asyncEmailValidator]],
      user_Password: ['', [Validators.required, Validators.minLength(6)]],
      user_ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      user_Dob: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator // Custom validator for password matching
    });
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

  if (this.signUp.valid) {
    this.user.user_Dob = "2021-01-01"; // Example date
    console.log("Form Submitted");
    console.log(this.signUp.value);
    this.user.user_FirstName = this.signUp.get('user_FirstName')?.value;
    this.user.user_LastName = this.signUp.get('user_LastName')?.value;
    this.user.user_Email = this.signUp.get('user_Email')?.value;
    this.user.user_Password = this.signUp.get('user_Password')?.value;
    this.user.user_Dob = this.signUp.get('user_Dob')?.value;
    console.log(this.user);
        this.datasource.addUser(this.user);
   this.redirectTologin();
    // Submit the form data to the server
  } else {
    console.log("Form is invalid");
    
    // Print detailed status of each control
    Object.keys(this.signUp.controls).forEach(key => {
      const control = this.signUp.get(key);
      console.log(key + ' status: ' + control?.status);
      console.log(key + ' value: ' + control?.value);
      console.log(key + ' errors: ' + JSON.stringify(control?.errors));
    });
  }
  }
  asyncEmailValidator(control: AbstractControl): Observable<{ [key: string]: any } | null> {
    // Example async validator that simulates an asynchronous operation
    return of(null).pipe(delay(500)); // Replace with actual async validation logic
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('user_Password');
    const confirmPassword = formGroup.get('user_ConfirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
}

import { User } from './../models/user.model';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor() {}
  User: User = new User(0, "", "", "", "", "", 0, 0);
   Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  
  saveUserInfo(){
    this.Toast.fire({
      icon: "success",
      title: "Profile Updated!"
    });
    console.log(this.User.user_FirstName);
    console.log(this.User.user_LastName);
    console.log(this.User.user_Email);
  }
}

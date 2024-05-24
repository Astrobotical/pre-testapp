import { SharedService } from './../shared.service';
import { User } from './../models/user.model';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Media } from "@capacitor-community/media";
import {NativeAudio} from '@capacitor-community/native-audio';
import { Howl  } from 'howler';
import { DatabaseServiceService } from '../services/database-service.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private SharedService: SharedService,private datasource:DatabaseServiceService) {
    this.SharedService.getData("user").subscribe(
      (data) => {
        this.User = data;
      }
    );
  }
  User: User = new User(0, "", "", "", "", "", 0, 0,0,0);
  
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
  
 async playAudio(){
    console.log("Playing Audio");
    const audioFile = new Howl({
      src: ['assets/audio/Notification.mp3'],
      html5: true,
      volume: 0.5, });  
    audioFile.play();
  }
  saveUserInfo(){
    this.Toast.fire({
      icon: "success",
      title: "Profile Updated!"
    });
    this.datasource.updateUser(this.User);
  }
}
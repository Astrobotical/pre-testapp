import { SharedService } from './../shared.service';
import { timeout } from 'rxjs';
import { BleService } from './../ble.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { AlertController } from '@ionic/angular';
import { DatabaseServiceService } from '../services/database-service.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private bluetoothService : BleService,private sharedData : SharedService,public alertController: AlertController,private datasource:DatabaseServiceService) {
    this.sharedData.getData("user").subscribe(
      (data) => {
        this.currentUser = data;
        this.userName = this.currentUser.user_FirstName;
        this.userYearlyGoal = data.userYearlyGoal;
        this.promptSetGoal();
        if(this.currentUser.user_Height == 0 || this.currentUser.user_Weight == 0){
          this.promptSetHeightnWeight();
        }
        this.userMiles = data.userMiles;
        this.userPercentage = data.userPercentage;
        this.userWristband = data.userWristband;
      }
    );
  }
  currentUser: User = new User(0, "", "", "", "", "", 0, 0);
  userName : String = "Joseph";
  userYearlyGoal : number = 250;
  userMiles : number = 150;
  userPercentage : number = 150/250 * 100;
  devices: any[] = [];
  isUploading : boolean = false;
  userWristband : String = "Fitbit";

  Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
  });
  getPreviousRuns(){
    
  }
  async ngOnInit() {
    this.devices = await this.bluetoothService.scanForDevices().then(
      (devices) => {
        console.log(devices);
        return devices;
      }
    );
  }
  startUpload(){
    
  
  }
  setGoal(){

  }
  setWristband(){

  }
  setUserDailyFeat(){

  }
  async promptSetHeightnWeight(){
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Set Height and Weight',
      inputs: [
        {
          name: 'height',
          type: 'number',
          placeholder: 'Enter Height'
        },
        {
          name: 'weight',
          type: 'number',
          placeholder: 'Enter Weight'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'custom-alert-button',
        }, {
          text: 'Ok',
          handler: (data) => {
            this.currentUser.user_Height = data.height;
            this.currentUser.user_Weight = data.weight;
            this.Toast.fire({
              icon: "success",
              title: "Height and Weight Set!"
            });
            this.sharedData.setData("user", this.currentUser);
            this.datasource.updateUser(this.currentUser);
          },
          cssClass: 'custom-alert-button',
        },
        
      ]
    });
    await alert.present();
  }
  async promptSetGoal(){
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Set A Yearly Goal',
      inputs: [
        {
          name: 'goal',
          type: 'number',
          placeholder: 'Enter Goal'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'custom-alert-button',
        }, {
          text: 'Ok',
          handler: (data) => {
            this.userYearlyGoal = data.goal;
            this.Toast.fire({
              icon: "success",
              title: "Goal Set!"
            });
          },
          cssClass: 'custom-alert-button',
        },
        
      ]
    });
    await alert.present();
  }
  async updateUserData(){
    this.sharedData.setData("user", this.currentUser);
    this.Toast.fire({
      icon: "success",
      title: "Profile Updated!"
    });
    
  }
  async upload(){
    this.isUploading = true;
    setTimeout(() => {
      this.isUploading = false;
      
      this.Toast.fire({
        icon: "success",
        title: "Data Uploaded!"
      });
    }, 3000);
  }  
}

import { AlertService } from './../alert.service';
import { SharedService } from './../shared.service';
import { timeout } from 'rxjs';
import { BleService } from './../ble.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { AlertController, ModalController  } from '@ionic/angular';
import { DatabaseServiceService } from '../services/database-service.service';
import { isThisQuarter } from 'date-fns';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private bluetoothService : BleService,private sharedData : SharedService,public alertController: AlertController,private datasource:DatabaseServiceService, private customAlerts : AlertService) {
    this.sharedData.getData("user").subscribe(
      (data) => {
        this.currentUser = data;
    
        this.userName = this.currentUser.user_FirstName;
        this.userYearlyGoal = data.userYearlyGoal;
        this.userMiles = data.userMiles;
        this.userPercentage = data.userPercentage;
        this.userWristband = data.userWristband;
      }
    );
    if(this.currentUser.user_Height == 0 || this.currentUser.user_Weight == 0){
      this.promptSetHeightnWeight();
    }else if(this.currentUser.user_YearlyGoal == 0){
      this.promptSetGoal();
    }
  }
  currentUser: User = new User(0, "", "", "", "", "", 0, 0,0,0);
  userName : String = "Joseph";
  userYearlyGoal : number = 0;
  userMiles : number = 150;
  userPercentage : number = 150/250 * 100;
  devices: any[] = [];
  isUploading : boolean = false;
  userWristband : String = "Fitbit";
  presentingElement:any;
  isUserModalOpen: boolean = false;
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
          placeholder: 'Enter Height in cm'
        },
        {
          name: 'weight',
          type: 'number',
          placeholder: 'Enter Weight in lbs'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'custom-alert-button',
        }, {
          text: 'Ok',
          handler: async (data) => {
            this.currentUser.user_Height = data.height;
            this.currentUser.user_Weight = data.weight;
            this.customAlerts.presentSpinner("Setting Height and Weight");
            this.sharedData.setData("user", this.currentUser);
           if(await this.datasource.updateUser(this.currentUser)){
            this.Toast.fire({
              icon: "success",
              title: "Height and Weight Set!"
            });
           }
            this.customAlerts.dismissSpinner();
           
          },
          cssClass: 'custom-alert-button',
        },
        
      ]
    });
    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK'],
      cssClass: 'custom-alert' // Apply the custom CSS class here
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
          handler: async (data) => {
            this.currentUser.user_YearlyGoal = data.goal;
            this.sharedData.setData("user", this.currentUser);
           if(await this.datasource.updateUser(this.currentUser))
            {
              this.Toast.fire({
                icon: "success",
                title: "Goal Set!"
              });
            }else{
            this.customAlerts.failed("Setting Goal");
            }
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

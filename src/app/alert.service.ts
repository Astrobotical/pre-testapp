import { Injectable } from '@angular/core';
import { AlertController,LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,private loadingController: LoadingController) { }

  async presentSpinner(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      cssClass: 'custom-loading', 
    });
    await loading.present();
  }
  async success(message: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: [{
        text:'OK',
        role: 'cancel',
        cssClass: 'custom-alert-button',
      }
      
      ],
      cssClass:'alert-success'
    });
    await alert.present();
  }
  async failed(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: [{
        text:'OK',
        role: 'cancel',
        cssClass: 'custom-alert-button',
      }
      
      ],
      cssClass:'alert-danger'
    });
    await alert.present();
  }
  async dismissSpinner() {
    const loading = await this.loadingController.getTop();
    if (loading) {
      await loading.dismiss();
    }
  }
}
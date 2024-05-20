import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninPageRoutingModule,
    SweetAlert2Module,
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}

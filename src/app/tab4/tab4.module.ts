import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab4Component } from './tab4.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Tab1PageRoutingModule } from '../tab1/tab1-routing.module';


@NgModule({
  declarations: [Tab4Component],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ]
})
export class Tab4PageModule { }

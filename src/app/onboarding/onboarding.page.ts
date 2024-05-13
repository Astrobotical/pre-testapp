
import { SwiperModule } from './../../../node_modules/swiper/types/shared.d';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import SwiperCore, { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {

  @ViewChild('swiperRef', { static: true })
  private _swiperRef: ElementRef | undefined;
  swiper?: Swiper
  SwiperModule = [IonicSlides];
 
  
  constructor() { }
  onSliderInit(){
    this.swiper = this._swiperRef?.nativeElement.swiper;
  }
  previousSlide(){
    this.swiper?.slideNext();
  }
  skipOnboarding(){} 

}


import { Router } from '@angular/router';
import { SwiperModule } from './../../../node_modules/swiper/types/shared.d';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import SwiperCore, { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { DatabaseServiceService } from '../services/database-service.service';
import { StorageService } from '../services/storage.service';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('swiperRef', { static: true })
  private _swiperRef: ElementRef | undefined;
  swiper?: Swiper
  SwiperModule = [IonicSlides];


  constructor(private route: Router, private storage: StorageService) {
    this.onBoardingAlter();
  }
  ngOnInit() {
    this.gotolanding();
  }
  async gotolanding() {
    await this.storage.get('Onboarding')?.then(
      (value) => {
        if (value == 'true') {
          this.route.navigate(['landingpage']);
        }
      }
    );
    timeout(3000)
    this.storage.set('Onboarding', 'true');
  }
  onSliderInit() {
    this.swiper = this._swiperRef?.nativeElement.swiper;

  }
  nextSlide() {
    this.swiper?.slideNext();
  }

  skipOnboarding() {
    this.route.navigate(['landingpage']);
  }
  onBoardingAlter() {
    let totalSlides = this.swiper?.slides.length;
    let currentSlide = 1;
    if (totalSlides != 0) {
      const interval = setInterval(() => {
        console.log(currentSlide);
        this.swiper?.slideTo(currentSlide);

        if (currentSlide === 3) {
          clearInterval(interval);
          this.route.navigate(['landingpage']);
        }
        if (currentSlide < 4) {
          currentSlide++;
        }
      }, 2000);

    } else {
      console.log("No Slides Found");
    }
  }
}

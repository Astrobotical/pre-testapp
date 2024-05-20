import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage-angular';
import {Drivers} from '@ionic/storage';
import {StorageService} from 'src/app/services/storage.service';
import 'promise-polyfill/src/polyfill';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule, FontAwesomeModule,
    IonicStorageModule.forRoot({name: '__mydb', driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]}),
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
     StorageService, 
     provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {}

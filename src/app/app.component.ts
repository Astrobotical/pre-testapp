import { Component } from '@angular/core';
import { faHome,} from '@fortawesome/free-solid-svg-icons';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  faHome = faHome;

  constructor() {
  }  
}

import { Component, OnInit } from '@angular/core';
import { faHome,} from '@fortawesome/free-solid-svg-icons';
import { register } from 'swiper/element/bundle';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import {DatabaseServiceService} from './services/database-service.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit {
  faHome = faHome;

  constructor(private dbService: DatabaseServiceService) {
  }
  async ngOnInit() {
    console.log('started');
    //this.dbService.initializePlugin();
    //this.dbService.createDatabase();
  }
}

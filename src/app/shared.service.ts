import { Injectable } from '@angular/core';
import { Observable, Subject, filter, map } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSubject = new Subject<{ id: string, data: any }>();
  private runDataSubject = new Subject<User>();
  runData$: Observable<User> = this.runDataSubject.asObservable();


  setUserRunData(data: User) {
    this.runDataSubject.next(data);
  }
  setData(id: string, data: any) {
    this.dataSubject.next({ id, data });
  }

  getData(id: string) {
    return this.dataSubject.asObservable().pipe(
      filter(item => item.id === id),
      map(item => item.data)
    );
  }
}

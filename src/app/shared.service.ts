import { Injectable } from '@angular/core';
import { Subject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSubject = new Subject<{ id: string, data: any }>();

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

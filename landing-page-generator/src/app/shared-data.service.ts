import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pageDataProfile } from './form/form.component';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private pagesDataSubject: BehaviorSubject<pageDataProfile[]> =
    new BehaviorSubject<pageDataProfile[]>([]);
  public pagesData$: Observable<pageDataProfile[]> =
    this.pagesDataSubject.asObservable();

  updatePagesData(data: pageDataProfile[]): void {
    this.pagesDataSubject.next(data);
  }
}

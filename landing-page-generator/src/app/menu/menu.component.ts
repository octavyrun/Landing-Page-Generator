import { Component, OnDestroy, OnInit } from '@angular/core';
import { pageDataProfile } from '../form/form.component';
import { SharedDataService } from '../shared-data.service';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  isDrawerOpen = true;
  pages: pageDataProfile[] = [];
  pages$: Observable<pageDataProfile[]>;
  pagesCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.pagesCollection = collection(this.firestore, 'pages');
    this.pages$ = collectionData(this.pagesCollection, {
      idField: 'id',
    }) as Observable<pageDataProfile[]>;
  }

  ngOnInit(): void {
    this.pages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: pageDataProfile[]) => {
        this.pages = data;
      });
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}

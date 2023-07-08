import { Component, OnInit } from '@angular/core';
import { pageDataProfile } from '../form/form.component';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  pageData: pageDataProfile | undefined;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      const pageRef = doc(this.firestore, 'pages', id);
      const pageSnapshot = await getDoc(pageRef);
      if (pageSnapshot.exists()) {
        this.pageData = pageSnapshot.data() as pageDataProfile;
        console.log(this.pageData);
      } else {
        // Handle case when the document does not exist
        // For example, display an error message or redirect to a different page
      }
    });
  }
}

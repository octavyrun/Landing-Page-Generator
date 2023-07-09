import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  CollectionReference,
  DocumentReference,
} from '@angular/fire/firestore';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  submitBtnStatus = true;
  btnPressed = false;
  form!: FormGroup;
  pages$: Observable<pageDataProfile[]>;
  pagesCollection: CollectionReference;

  constructor(private firestore: Firestore, private router: Router) {
    this.pagesCollection = collection(this.firestore, 'pages');
    this.pages$ = collectionData(this.pagesCollection) as Observable<
      pageDataProfile[]
    >;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      pictureLink: new FormControl('', [Validators.required]),
      websiteLink: new FormControl('', [Validators.required]),
    });
    this.form.valueChanges.subscribe(() => {
      this.submitBtnStatus = !this.form.valid;
    });
  }
  generateWebpage(): void {
    const title = this.form.get('title')?.value;
    const content = this.form.get('content')?.value;
    const pictureLink = this.form.get('pictureLink')?.value;
    const websiteLink = this.form.get('websiteLink')?.value;

    this.addWebpage(title, content, pictureLink, websiteLink);
  }

  addWebpage(
    title: string,
    content: string,
    pictureLink: string,
    websiteLink: string
  ): void {
    if (!title || !content || !pictureLink || !websiteLink) {
      throw new Error('Please check the fields!');
    } else {
      addDoc(this.pagesCollection, <pageDataProfile>{
        title,
        content,
        pictureLink,
        websiteLink,
      }).then((documentReference: DocumentReference) => {
        this.router.navigate(['/landing-page', documentReference.id]);
      });
    }
  }
}

export interface pageDataProfile {
  id: string;
  title: string;
  content: string;
  pictureLink: string;
  websiteLink: string;
}

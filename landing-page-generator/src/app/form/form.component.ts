import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  submitBtnStatus = false;
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    pictureLink: new FormControl('', [Validators.required]),
    websiteLink: new FormControl('', [Validators.required]),
  });

  generateWebpage() {
    console.log(this.form.value);
  }
}

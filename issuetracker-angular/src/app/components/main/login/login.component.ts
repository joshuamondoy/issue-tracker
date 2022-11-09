import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faCaretLeft = faCaretLeft;
  isRegistered: boolean = true;
  getStarted: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(formValues: NgForm) {}

  toggleRegister() {
    this.isRegistered = !this.isRegistered;
  }

  toggleForm() {
    this.getStarted = !this.getStarted;
  }
}

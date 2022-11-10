import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faCaretLeft = faCaretLeft;
  isRegistered: boolean = true;
  isSmallScreen: boolean = false;
  isLogin: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(formValues: NgForm) {
    let user;
    let formValue = formValues.value;
    if (this.isRegistered) {
    } else {
      user = new User(
        0,
        formValue.firstName,
        formValue.lastName,
        formValue.email,
        formValue.password
      );
      console.log(user);
    }
  }

  toggleRegister() {
    this.isRegistered = !this.isRegistered;
  }

  toggleForm() {
    this.isSmallScreen = !this.isSmallScreen;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faCaretLeft = faCaretLeft;
  isRegistered: boolean = true;
  isSmallScreen: boolean = false;
  isLogin: boolean = false;
  isShowPassword: boolean = false;
  isPasswordMatch!: boolean;
  signupPassword!: boolean;
  confirmPassword!: boolean;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(formValues: NgForm) {
    let user;
    let formValue = formValues.value;

    if (this.isRegistered) {
      console.log(formValue);

      this.router.navigate(['issues/open-issues']);
    } else {
      user = new User(
        0,
        formValue.firstname,
        formValue.lastname,
        formValue.signupemail,
        formValue.signuppassword
      );

      this.httpService.addUser(user).subscribe();
      alert('Succesfully registered!');
      formValues.reset();
      this.isRegistered = !this.isRegistered;
    }
  }

  toggleRegister() {
    this.isRegistered = !this.isRegistered;
  }

  toggleForm() {
    this.isSmallScreen = !this.isSmallScreen;
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}

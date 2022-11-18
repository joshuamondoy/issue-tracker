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
  isValidCredentials: boolean = false;
  isLoggedIn: number = 0;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.httpService.isLoggedIn.subscribe((res) => (this.isLoggedIn = res));
  }

  onSubmit(formValues: NgForm) {
    let user;
    let formValue = formValues.value;

    if (this.isRegistered) {
      if (formValue.loginEmail != '' && formValue.loginPassword != '') {
        this.httpService
          .authUser(formValue.loginEmail, formValue.loginPassword)
          .subscribe((res) => {
            this.httpService.isLoggedIn.next(res);
            if (res) {
              this.router.navigate(['issues/open-issues']);
            } else {
              this.toggleErrorMsg();
            }
          });
      } else {
        this.toggleErrorMsg();
      }
    } else {
      user = new User(
        0,
        formValue.firstName,
        formValue.lastName,
        formValue.signupEmail,
        formValue.signupPassword
      );

      this.httpService.addUser(user).subscribe();
      alert('Succesfully registered!');
      formValues.reset();
      this.isRegistered = !this.isRegistered;
    }
  }

  toggleErrorMsg() {
    this.isValidCredentials = !this.isValidCredentials;
    setTimeout(() => {
      this.isValidCredentials = !this.isValidCredentials;
    }, 2000);
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
  viewIssues() {
    console.log(this.isLoggedIn);

    this.isLoggedIn
      ? this.router.navigate(['/issues/open-issues'])
      : alert('Please login first'),
      this.toggleForm();
  }
}

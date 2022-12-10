import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

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

  constructor(
    private httpService: HttpService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(formFields: NgForm) {
    let user;
    let formField = formFields.value;
    if (this.isRegistered) {
      if (formField.loginEmail != '' && formField.loginPassword != '') {
        this.httpService
          .authUser(formField.loginEmail, formField.loginPassword)
          .subscribe((res) => {
            if (res) {
              this.router.navigate(['issues/open-issues']);
              localStorage.setItem(
                'currentUserEmail',
                JSON.stringify(formField.loginEmail)
              );
              this.utilityService.isLoggedIn.next(res);
              localStorage.setItem('isLoggedIn', res.toString());
            } else {
              this.toggleErrorMsg();
            }
          });
      } else {
        this.toggleErrorMsg();
      }
    } else {
      const firstName = formField.firstName;
      const lastName = formField.lastName;

      user = new User(
        0,
        firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName.charAt(0).toUpperCase() + lastName.slice(1),
        formField.signupEmail,
        formField.signupPassword
      );
      this.httpService.addUser(user).subscribe();
      alert('Succesfully registered!');
      formFields.reset();
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
    this.isLoggedIn
      ? this.router.navigate(['/issues/open-issues'])
      : alert('Please login first'),
      this.toggleForm();
  }
}

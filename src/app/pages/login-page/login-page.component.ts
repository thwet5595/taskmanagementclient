import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoginPageService } from './login-page.service';
import { CurrentUserService } from 'src/app/common/services/current-user.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { HttpError } from 'src/app/common/constants/http-error';
import { UserAccountLockedDialogComponent } from 'src/app/common/components/user-account-locked-dialog/user-account-locked-dialog.component';
import { UserAlreadyExistDialogComponent } from 'src/app/common/components/user-already-exist-dialog/user-already-exist-dialog.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  passwordInput: ElementRef<any>;
  @ViewChild('passwordInput') set passwordInputEle(passwordInputEle: ElementRef) {
      this.passwordInput = passwordInputEle;
  }

  loginForm: FormGroup;
  passwordFlag: boolean = false;
  _shown = false;
  loading = false;

  constructor(
      private alertService: AlertService,
      private fb: FormBuilder,
      private loginPageService: LoginPageService,
      private currentUser: CurrentUserService,
      private router: Router,
      private appComponent: AppComponent,
      private dialog: MatDialog,
      private loginService: LoginPageService
  ) {

  }

  ngOnInit() {
      if (this.currentUser.isLogged()) {
        this.currentUser.clearSession();
      }
      var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
      this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email, Validators.pattern(emailRegex)]],
          password: ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  ngAfterViewInit() {
  }

  get f() { return this.loginForm.controls; }
  tryLogin() {
    if (this.loginForm.invalid) {
        return;
    }

    // Login
    this.loginPageService.login(this.loginForm.value.email,
        this.loginForm.value.password)
        .subscribe(
        (res: any) => {
            sessionStorage.setItem('ACCESS_TOKEN', res.access_token);
            sessionStorage.setItem('REFRESH_TOKEN', res.refresh_token);

            // Get User Detail by email and password
            this.loginPageService.getUserByEmailAndPassword(
                this.loginForm.value.email,
                this.loginForm.value.password,
                res.access_token
            )
                .subscribe(
                res => {
                    if (res) {
                        this.currentUser.setCurrentUser(res.id, res.role, res.email, res.name, res.sessionId);
                        this.appComponent.ngOnInit();
                    }
                    this.router.navigateByUrl('/task-create');
                },
                err => {
                    this.alertService.error('Incorret Email or Password!');
                    // if (err.status === 401) {
                    //     this.alertService.error(JSON.stringify(err.error));
                    // } else {
                    //     this.alertService.error('Incorret Email or Password!');
                    // }
                });
        },
        err => {
            this.alertService.error('Incorret Email or Password!');
            // if (err.status === 401) {
                
            //     this.alertService.error(JSON.stringify(err.error.error_description));
            // } else if (err.status === 400 && err.error.error_description === "LOCKED") {
               
            //     this.alertService.error('Your Account is Locked!');
            // } else {
            //     this.alertService.error('Incorret Email or Password!');
            // }
        })
}

  loginAndRoute() {
      if (this.currentUser.isLogged()) {
          const role = this.currentUser.getRole();
          if (role === 'ROLE_SUPER') {
              this.router.navigateByUrl('/rm');
          } else if (role === 'ROLE_RETAILERAUTHORIZER') {
              this.router.navigateByUrl('/invoice-approval');
          } else {
              this.router.navigateByUrl('/dashboard');
          }
      } else {
          this.router.navigateByUrl('/');
      }
  }

  showPassword() {
      this._shown = !this._shown;
      if (this._shown) {
          this.passwordInput.nativeElement.setAttribute('type', 'text');
          this.passwordFlag = true;
      } else {
          this.passwordInput.nativeElement.setAttribute('type', 'password');
          this.passwordFlag = false;
      }
  }

  userAlreadyExit() {
      const dialogRef = this.dialog.open(UserAlreadyExistDialogComponent, {
          width: '500px',
          panelClass: 'user-already-exist-overlay-pane'
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
              this.loginService.logout(this.loginForm.value.email).subscribe(resp => {
                  this.currentUser.clearSession();
                  this.alertService.success('Successfully Log Out!');
                  this.router.navigateByUrl('/');
              });
          }
      });
  }

  userAccountLocked() {
      const dialogRef = this.dialog.open(UserAccountLockedDialogComponent, {
          width: '500px',
          panelClass: 'user-account-locked-overlay-pane'
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
              this.currentUser.clearSession();
              this.router.navigateByUrl('/login');
          }
      });
  }
}

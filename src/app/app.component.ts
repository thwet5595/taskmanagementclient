import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { CurrentUserService } from './common/services/current-user.service';
import { LoginPageService } from './pages/login-page/login-page.service';
import { AlertService } from './common/services/alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    mobileQuery: MediaQueryList;

    @ViewChild('drawer') drawer: any;
    title = 'app';
    role: string;
    displayRole: string;
    label: string;
    email: string;
    name: string;

    private _mobileQueryListener: () => void;

    constructor(
      private currentUser: CurrentUserService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private loginService: LoginPageService,
        private alertService: AlertService
        ) {
        this.email = currentUser.getEmail();
        this.role = currentUser.getRole();
        this.name = currentUser.getName();

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

    }

    ngOnInit() {
        this.name = this.currentUser.getName();
        this.email = this.currentUser.getEmail();
        // if (this.currentUser.getRole() === 'ROLE_SUPER') {
        //     this.displayRole = 'Super User';
        // } else if (this.currentUser.getRole() === 'ROLE_CHECKER') {
        //     // this.displayRole = 'Checker User';
        //     this.displayRole = 'Supervisor User';
        // } else if (this.currentUser.getRole() === 'ROLE_MAKER') {
        //     // this.displayRole = 'Maker User';
        //     this.displayRole = 'Operator User';
        // } else if (this.currentUser.getRole() === 'ROLE_RETAILER') {
        //     this.displayRole = 'Retailer User';
        // }else if (this.currentUser.getRole() === 'ROLE_RETAILERAUTHORIZER') {
        //     this.displayRole = 'Retailer Authorizer User';
        // } 

    }

    toggleSideNav() {
        this.role = this.currentUser.getRole();
        // if (this.role === 'ROLE_SUPER') {
        //     // this.label = 'RM-Approver';
        //     this.label = 'Supervisor User';
        // } else {
        //     // this.label = 'RM';
        //     this.label = 'Operator User';
        // }
        this.drawer.toggle();
    }

    invoice() {
        this.router.navigateByUrl('/invoice');
    }

    logout() {
        this.drawer.close();
        this.currentUser.clearSession();
        this.router.navigateByUrl('/login');
        this.alertService.success('Successfully Logout!');
        // this.loginService.logout(this.currentUser.getEmail()).subscribe(resp => {
        //     this.currentUser.clearSession();
        //     this.router.navigateByUrl('/login');
        // });
    }

    isFirstLogin() {
        return this.currentUser.isFirstLogin();
    }

    isLogged() {
       return this.currentUser.isLogged();
    }

    hideMenu() {
        if (!this.currentUser.isLogged()) {
            return this.drawer.close();
        }
    }
}

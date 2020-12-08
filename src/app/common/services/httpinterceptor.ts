import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { tap, retry, catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CurrentUserService } from './current-user.service';
import { Router } from '@angular/router';
import { SessionExpiredDialogComponent } from '../components/session-expired-dialog/session-expired-dialog.component';
import { MatDialog } from '@angular/material';
import { ErrorService } from './error.service';
import { AlertService } from './alert.service';
import { LoggerService } from './logger.service';
import { HttpError } from '../constants/http-error';

@Injectable({
    providedIn: 'root'
})
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(
        // private loginService: LoginPageService,
        // private currentUser: CurrentUserService,
        private dialog: MatDialog,
        private router: Router,
        private errorService: ErrorService,
        private notifier: AlertService,
        private logger: LoggerService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let message;

        return next.handle(req).pipe(
            // retry(1),
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event instanceof HttpResponse) {
                    }
                }
            },
                (error: any) => {

                    if (error instanceof HttpErrorResponse) {

                        // Server-side error
                        message = this.errorService.getServerErrorMessage(error);

                        switch (error.status) {
                            case HttpError.BadRequest:
                                // this.notifier.error(message, 'Bad Request');
                                this.notifier.error(message);
                                // console.error('Bad Request 400');
                                break;

                            case HttpError.Unauthorized:
                          
                                // this.loginService.logout(this.currentUser.getEmail()).subscribe(resp => {
                                // });
                                // this.currentUser.clearSession();
                                this.router.navigateByUrl('/login');
                                break;

                            case HttpError.Forbidden:
                                // this.notifier.error(message, 'Forbidden');
                                this.notifier.error(message);
                                // console.error('Forbidden 403');
                                break;

                            case HttpError.NotFound:
                                // this.notifier.error(message, 'Not Found');
                                this.notifier.error(message);
                                // console.error('Not Found 404');
                                // console.error(error.error && error.error.message ? error.error.message :
                                //     error.statusText)
                                break;

                            case HttpError.TimeOut:
                                // this.notifier.error(message, 'Time Out');
                                this.notifier.error(message);
                                // console.error('TimeOut 408');
                                break;

                            // case HttpError.Locked:
                            //     // this.notifier.error(message, 'Locked');
                            //     this.notifier.error(message);
                            //     // console.error('Locked 423');
                            //     this.currentUser.clearSession();
                            //     break;

                            case HttpError.SessionExpired:
                                // this.notifier.error('Your session is expired!', 'Session Expired');
                                // console.error('SessionExpired 440');
                               // this.currentUser.clearSession();
                                this.router.navigateByUrl('/login');
                                // this.loginService.logout(this.currentUser.getEmail()).subscribe(resp => {
                                //     this.currentUser.clearSession();
                                //     this.router.navigateByUrl('/login');
                                // });
                                break;

                            case HttpError.InternalServerError:
                                // this.notifier.error(message, 'Internal Server Error');
                                this.notifier.error(message);
                                // console.error('Internal Server Error 500');
                                break;

                            case HttpError.BadGateway:
                                // this.notifier.error(message, 'Bad Gateway');
                                this.notifier.error(message);
                                // console.error('Bad Gateway 502');
                                break;

                        }
                    } else {

                        // Client-side error
                        // message = this.errorService.getClientErrorMessage(error);
                        // this.notifier.error(message);
                    }

                    // Always log errors
                    this.logger.error(message);
                    // console.error(error);
                }));
    }

    sessionExpired() {
        const dialogRef = this.dialog.open(SessionExpiredDialogComponent, {
            width: '500px',
            panelClass: 'session-expired-overlay-pane'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.router.navigateByUrl('/login');
            }
        });
    }
}


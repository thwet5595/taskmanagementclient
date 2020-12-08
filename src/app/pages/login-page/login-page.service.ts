import { Injectable } from '@angular/core';
import { ApiService } from '../../common/services/api.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Constants } from 'src/app/common/constants/app.constants';
import { LoginResultModel } from 'src/app/model/LoginResultModel';

@Injectable()
export class LoginPageService extends ApiService {

    login(email: string, password: string): Observable<HttpEvent<any>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(Constants.oauth2ClientID + ':' + Constants.oauth2ClientPassword)
            })
        };

        let body = new HttpParams()
            .set('username', email)
            .set('password', password)
            .set('grant_type', 'password');
        return this.http.post<HttpEvent<any>>(this.BASE_URL + 'oauth/token', body.toString(), httpOptions);
    }

    logout(email): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(Constants.oauth2ClientID + ':' + Constants.oauth2ClientPassword)
            })
        };

        let body = new HttpParams()
            .set('email', email)
        return this.http.post<any>(this.apiRoot + 'logout', body.toString(), httpOptions);
    }

    getUserByEmailAndPassword(email: string, password: string,  token: string): Observable<LoginResultModel> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.currentUserService.getAccessToken()
            })
        };
        const json = '{"email": "' + email + '","password": "' + password + '","token":"'+token+'"}';
        return this.http.post<LoginResultModel>(this.apiRoot + 'user/currentUser', json, httpOptions);
    }


    getUpdateLoginStartup(email: string): Observable<LoginResultModel> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const json = '{"email": "' + email + '"}';
        return this.http.put<LoginResultModel>(this.apiRoot + 'user/updateLoginStartup', json, httpOptions);
    }
}

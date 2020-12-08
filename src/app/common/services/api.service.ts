import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';


@Injectable()
export class ApiService {

    apiRoot: string = environment.apiRoot;
    BASE_URL: string = environment.baseUrl;

    constructor(
        public http: HttpClient,
        public currentUserService: CurrentUserService
    ) { }

    handleError(error: Response | any) {
        return Observable.throw(error);
    }

    extractData(res: any) {
        let body = res;
        return body || {};
    }
}

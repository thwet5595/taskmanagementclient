import { Injectable } from '@angular/core';

import { ApiService } from '../../common/services/api.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class ExcelProcessorService extends ApiService {

    downloadSampleExcel(sheetName: any, headers: any, data: any): Observable<any> {

        const formdata: FormData = new FormData();
        formdata.append('sheetName', sheetName);
        formdata.append('headers', JSON.stringify(headers));

        return this.http.post(this.apiRoot + 'downloadSampleExcel', formdata, {
            responseType: 'blob',
            headers: {
                'Authorization': 'Bearer ' + this.currentUserService.getAccessToken(),
                'SessionId': this.currentUserService.getSessionId()
            }
        });
    }


    downloadExcel(sheetName: any, headers: any, data: any): Observable<any> {

        const formdata: FormData = new FormData();
        formdata.append('sheetName', sheetName);
        formdata.append('headers', JSON.stringify(headers));
        formdata.append('data', JSON.stringify(data));

        return this.http.post(this.apiRoot + 'downloadExcel', formdata, {
            responseType: 'blob',
            headers: {
                'Authorization': 'Bearer ' + this.currentUserService.getAccessToken(),
                'SessionId': this.currentUserService.getSessionId()
            }
        });
    }
}

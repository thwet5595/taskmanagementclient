import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CurrentUserService } from '../../services/current-user.service';
import { FileUtil } from '../../file.util';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-dailogue-page',
    templateUrl: './dailogue-page.component.html',
    styleUrls: ['./dailogue-page.component.css']
})

@Injectable()
export class DailoguePageComponent implements OnInit {
    data: any;
    fileUpload: String;
    baseUrl = environment.apiRoot;
    url: String;
    fileName: string;
    public loading = false;

    constructor(
        private currentUserService: CurrentUserService,
        private dialogRef: MatDialogRef<DailoguePageComponent>,
        private fileUtil: FileUtil,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.data = data;
        //this.fileUpload = this.baseUrl + 'retrieve/' + data.id + "?access_token=" + this.currentUserService.getAccessToken();
        if (this.data.id) {
            this.getFiles();
            this.getFileName();
        } else {
            this.fileUpload = this.data.base64Data;
        }

    }

    ngOnInit() {

    }

    close() {
        this.dialogRef.close();
    }

    download() {
        // this.retailerService.getFiles(this.data.id).subscribe(
        //     (res: any) => {
        //         if (res instanceof HttpResponse) {
        //             this.fileUtil.downloadpdf(res.body, this.fileName);
        //         }
        //     },
        //     err => {
        //         this.loading = false;
        //     }
        // )
    }

    getFiles() {
        this.loading = true;
        // this.retailerService.getFiles(this.data.id).subscribe(
        //     (res: any) => {
        //         if (res instanceof HttpResponse) {
        //             //this.fileUtil.downloadpdf(res.body, this.fileName);
        //             this.fileUpload = res.body;
        //         }
        //     },
        //     err => {
        //         this.loading = false;
        //     }
        // )
    }

    getFileName() {
        // this.retailerService.getFileName(this.data.id).subscribe(
        //     (res: any) => {
        //         if (res instanceof HttpResponse) {
        //             this.fileName = res.body;
        //         }
        //     },
        //     err => {
        //         this.loading = false;
        //     }
        // )
    }

    public onPagesLoaded(event: any) {
        this.loading = false;
    }
}

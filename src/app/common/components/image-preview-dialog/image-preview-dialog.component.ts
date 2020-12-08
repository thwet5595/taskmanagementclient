import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-image-preview-dialog',
    templateUrl: './image-preview-dialog.component.html',
    styleUrls: ['./image-preview-dialog.component.css']
})
export class ImagePreviewDialogComponent implements OnInit {

    imageShow: any;

    constructor(public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit() {
        if (this.data.imageId) {
            this.getFiles(this.data.imageId)
        } else {
            this.retrieveImage(this.data.file);
        }
    }

    getFiles(imageid: string) {
        // this.invoiceService.getFiles(imageid).subscribe(
        //     (res: any) => {
        //         if (res instanceof HttpResponse) {
        //             this.createImageFromBlob(res.body);
        //         }
        //     },
        //     err => {
        //     }
        // )
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            this.imageShow = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    retrieveImage(image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event) => {
            this.imageShow = (<FileReader>event.target).result;
        };
    }
}

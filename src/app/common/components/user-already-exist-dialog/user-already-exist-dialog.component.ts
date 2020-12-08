import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-user-already-exist-dialog',
    templateUrl: './user-already-exist-dialog.component.html',
    styleUrls: ['./user-already-exist-dialog.component.css']
})
export class UserAlreadyExistDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

}

import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-closed-confirm-dialog',
  templateUrl: './closed-confirm-dialog.component.html',
  styleUrls: ['./closed-confirm-dialog.component.css']
})
export class ClosedConfirmDialogComponent implements OnInit {
  public client_code = '';
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
     }


  ngOnInit() {
  }

}

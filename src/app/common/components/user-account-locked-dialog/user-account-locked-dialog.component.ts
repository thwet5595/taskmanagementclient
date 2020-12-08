import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-account-locked-dialog',
  templateUrl: './user-account-locked-dialog.component.html',
  styleUrls: ['./user-account-locked-dialog.component.css']
})
export class UserAccountLockedDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reject-resend-confirm-dialog',
  templateUrl: './reject-resend-confirm-dialog.component.html',
  styleUrls: ['./reject-resend-confirm-dialog.component.css']
})
export class RejectResendConfirmDialogComponent implements OnInit {
  form: FormGroup;
  reason: string;
  submitted = false;

  public client_code = '';
  constructor(public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reason = data.reason;
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.form = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  save(): void {
    //this.dialogRef.close(this.form.value);
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value.reason);
  }
}

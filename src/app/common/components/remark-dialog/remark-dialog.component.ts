import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.css']
})
export class RemarkDialogComponent implements OnInit {
  form: FormGroup;
  remark: string;
  submitted = false;

  public client_code = '';
  constructor(public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.remark = data.remark;
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.form = this.fb.group({
      remark: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  save(): void {
    //this.dialogRef.close(this.form.value);
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value.remark);
  }
}

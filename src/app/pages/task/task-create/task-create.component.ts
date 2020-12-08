import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/services/alert.service';
import { CurrentUserService } from 'src/app/common/services/current-user.service';
import { FileUtil } from 'src/app/common/file.util';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Constants } from 'src/app/common/constants/app.constants';
import { DatePipe } from '@angular/common';
import { ClosedConfirmDialogComponent } from 'src/app/common/components/closed-confirm-dialog/closed-confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
    @ViewChild('form') form;
    createTaskForm: FormGroup;
    priorityList = ["High", "Medium", "Low"];
    priority: string;

    constructor(private alertService: AlertService, private fb: FormBuilder, private taskService: TaskService,
        private currentUser: CurrentUserService, private fileUtil: FileUtil, private router: Router, private datePipe: DatePipe,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.createTaskForm = this.fb.group({
            title: ['', Validators.required],
            expDate: ['', Validators.required],
            priority: ['', Validators.required]
        });
    }

    get f() { return this.createTaskForm.controls; }

    createTask() {
        if (this.createTaskForm.invalid) {
            return;
        }


        const dialogRef = this.dialog.open(ClosedConfirmDialogComponent, {
            width: '500px',
            panelClass: 'closed-overlay-pane',
            disableClose: true,
            data: { title: 'Confirmation!', content: 'Are you sure you want to create?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {

                this.taskService.createTask(
                    this.createTaskForm.value.title,
                    this.datePipe.transform(this.createTaskForm.value.expDate, Constants.dateFormat),
                    this.createTaskForm.value.priority
                )
                    .subscribe(
                        (resp: any) => {
                            this.form.resetForm();
                            this.alertService.success('Task Created Successfully!');
                        });
            }
        })
    }

    priorityChange($event) {
        // this.priority = $event.value;
        this.createTaskForm.patchValue({
            priority: $event.value
        });
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/common/services/alert.service';
import { TaskService } from '../task.service';
import { CurrentUserService } from 'src/app/common/services/current-user.service';
import { MatDialog } from '@angular/material';
import { Constants } from 'src/app/common/constants/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ClosedConfirmDialogComponent } from 'src/app/common/components/closed-confirm-dialog/closed-confirm-dialog.component';
import { DeleteConfirmDialogComponent } from 'src/app/common/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

    taskUpdateForm: FormGroup;
    priorityList = ["High", "Medium", "Low"];
    compStatusList = ["Yes", "No"];
    selectedStatus: string;
    selectedTask: string;
    noRowsTemplate;
    taskId: string;
    isEdit: boolean = false;
    isComplete: boolean = false;
    taskCount = 0;
    gridApi;
    gridOptions: any;
    compDate: string;
    convertedDate: string;
    editIndex;
    taskDefs =
        [
            {
                headerName: 'Task ID',
                field: 'id',
                checkboxSelection: true
            },
            { headerName: 'Title', field: 'title' },
            // { headerName: 'Priority', field: 'priority' },
            {
                headerName: 'Priority',
                field: 'priority',
                cellRenderer: 'resubmit'
            },
            { headerName: 'Expected Date', field: 'expectedDate' },
            { headerName: 'Completed Status', field: 'completedStatus' },
            { headerName: 'Deleted Status', field: 'deletedStatus' }
        ];

    constructor(
        private alertService: AlertService,
        private taskService: TaskService,
        private currentUser: CurrentUserService,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private datePipe: DatePipe
    ) {
        this.noRowsTemplate = "No Data To Show";
        this.getTaskCount();

        this.gridOptions = {
            enableSorting: false,
            enableFilter: false,
            components: {
                resubmit: this.resubmit
            },
            suppressRowClickSelection: true,
            pagination: true,
            rowBuffer: 0,
            rowSelection: 'multiple',
            rowModelType: 'infinite',
            paginationPageSize: 10,
            maxConcurrentDatasourceRequests: 1,
            maxBlocksInCache: 1,
            cacheBlockSize: 10,
            rowHeight: 40,
        };
    }

    ngOnInit() {
        this.taskUpdateForm = this.fb.group({
            title: ['', Validators.required],
            expDate: ['', Validators.required],
            compDate: [''],
            priority: ['', Validators.required],
            compStatus: ['', Validators.required]
        });
    }

    get f() { return this.taskUpdateForm.controls; }

    resubmit(params) {
        console.log('Inside resubmit...', params.data);
        if (params.data !== undefined) {
            if (params.data.priority === 'High') {
                return '<span class="badge badge-danger" style="font-size: 12px;padding-right: 37px;">' + params.value+'</span>';
            } else if (params.data.priority === 'Medium') {
                return '<span class="badge badge-success" style="font-size: 12px;padding-right: 37px;">' + params.value+'</span>';
            } else if (params.data.priority === 'Low') {
                return '<span class="badge badge-primary" style="font-size: 12px;padding-right: 37px;">' + params.value+'</span>';
            }
        }
    }

    taskGridReady(params) {
        this.gridApi = params.api;
        const size = Constants.paginationSize;
        this.gridOptions.api.showNoRowsOverlay();
        const dataSource = {
            getRows: (params) => {
                const page = this.gridApi.paginationGetCurrentPage();
                this.taskService.getTaskForPagination(page, size)
                    .subscribe(
                        resp => {
                            console.log('Res...', resp);
                            console.log('Task COunt...', this.taskCount);
                            if (resp.length > 0) {
                                this.gridOptions.api.hideOverlay();
                            }
                            params.successCallback(
                                resp, this.taskCount
                            );
                        }
                    );
            }
        };
        params.api.setDatasource(dataSource);
    }

    getTaskCount(): void {
        this.taskService.getTaskCount()
            .subscribe
            (
                resp => {
                    this.taskCount = resp.taskCount;
                    console.log('task count', this.taskCount);
                }
            );
    }

    completeTask() {
        const selectedRows = this.gridApi.getSelectedRows();
        const selectedData = selectedRows.map(data => data.id).join(', ');
        if (!selectedData) {
            this.alertService.warning("Please select at least one row!")
            return;
        }

        const dialogRef = this.dialog.open(ClosedConfirmDialogComponent, {
            width: '500px',
            panelClass: 'closed-overlay-pane',
            disableClose: true,
            data: { title: 'Confirmation!', content: 'Are you sure you want to approve?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.taskService.completeTask(selectedData)
                    .subscribe
                    (
                        (resp: any) => {
                            this.getTaskCount();
                            this.gridApi.deselectAll();
                            this.gridApi.refreshInfiniteCache();

                            const error = resp.error;
                            if (error.length > 0) {
                                this.alertService.error('The following tasks are not approved [' + error + ']');
                            }

                            const success = resp.success;
                            if (success.length > 0) {
                                this.alertService.success('The following tasks are approved [' + success + ']');
                            }
                        }
                    );
            }
        })
    }

    deleteTask() {
        const selectedRows = this.gridApi.getSelectedRows();
        const selectedData = selectedRows.map(data => data.id).join(', ');
        if (!selectedData) {
            this.alertService.warning("Please select at least one row!")
            return;
        }

        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
            width: '500px',
            panelClass: 'closed-overlay-pane',
            disableClose: true,
            data: { title: 'Confirmation!', content: 'Are you sure you want to delete?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {

                this.taskService.deleteTask(selectedData)
                    .subscribe
                    (
                        (resp: any) => {
                            this.getTaskCount();
                            this.gridApi.deselectAll();
                            this.gridApi.refreshInfiniteCache();

                            const error = resp.error;
                            if (error.length > 0) {
                                this.alertService.error('The following tasks are not deleted [' + error + ']');
                            }

                            const success = resp.success;
                            if (success.length > 0) {
                                this.alertService.success('The following retailers are deleted [' + success + ']');
                                // this.isShowDetails = false;
                            }
                        }
                    );
            }
        })
    }

    onRowClickedForTask($event) {
        console.log('Data...', $event.node.data);
        this.editIndex = $event.rowIndex;
        if ($event.node.data) {
            this.selectedTask = $event.node.data.priority;
            this.selectedStatus = $event.node.data.completedStatus;
            this.taskId = $event.node.data.id;
            this.taskUpdateForm.patchValue({
                title: $event.node.data.title,
                priority: $event.node.data.priority,
                compStatus: $event.node.data.completedStatus,
                expDate: new Date(this.datePipe.transform(new Date($event.node.data.expectedDate), Constants.dateFormat))
            });
            this.isEdit = true;
        }
    }

    priorityChange($event) {
        this.selectedTask = $event.value;
        this.taskUpdateForm.patchValue({
            priority: $event.value
        });
    }

    compStatusChange($event) {
        this.selectedStatus = $event.value;
        if (this.selectedStatus === 'Yes') {
            this.isComplete = true;
        } else {
            this.isComplete = false;
            this.compDate = '';
        }
        this.taskUpdateForm.patchValue({
            compStatus: $event.value
        });
    }

    updateTask() {
        // if (this.taskUpdateForm.invalid) {
        //     return;
        // }

        
        const dialogRef = this.dialog.open(ClosedConfirmDialogComponent, {
            width: '500px',
            panelClass: 'closed-overlay-pane',
            disableClose: true,
            data: { title: 'Confirmation!', content: 'Are you sure you want to update?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
               
        console.log('Completed Date...', this.compDate);
        if (this.compDate !== '' && this.compDate !== undefined) {
            this.compDate = this.datePipe.transform(this.compDate, Constants.dateFormat)
        }

        this.taskService.updateTask
            (
                this.taskUpdateForm.value.title,
                this.datePipe.transform(this.taskUpdateForm.value.expDate, Constants.dateFormat),
                this.compDate,
                this.taskUpdateForm.value.priority,
                this.taskUpdateForm.value.compStatus,
                this.taskId
            )
            .subscribe(event => {
                var row = this.gridApi.getDisplayedRowAtIndex(this.editIndex);
                row.data.title = this.taskUpdateForm.value.title;//refresh in grid
                row.data.expDate = this.taskUpdateForm.value.expectedDate;
                row.data.priority = this.taskUpdateForm.value.priority;
                this.gridApi.redrawRows({ rowNodes: [row] });
                this.gridApi.refreshInfiniteCache();
                this.getTaskCount();
                this.isEdit = false;
                this.alertService.success('Task Updated Successfully!');
            });
            }
        })
    }
}

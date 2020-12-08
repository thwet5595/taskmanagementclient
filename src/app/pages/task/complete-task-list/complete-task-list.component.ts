import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constants/app.constants';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/common/services/alert.service';
import { TaskService } from '../task.service';
import { CurrentUserService } from 'src/app/common/services/current-user.service';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { DeleteConfirmDialogComponent } from 'src/app/common/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-complete-task-list',
  templateUrl: './complete-task-list.component.html',
  styleUrls: ['./complete-task-list.component.css']
})
export class CompleteTaskListComponent implements OnInit {

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

  title: string;
  compStatus: string;
  priority: string;

  
  taskDefs =
      [
          {
              headerName: 'Task ID',
              field: 'id',
              checkboxSelection: true
          },
          { headerName: 'Title', field: 'title' },
          { headerName: 'Priority', field: 'priority' },
          { headerName: 'Completed Date', field: 'completedDate' },
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
          suppressRowClickSelection: true,
          pagination: true,
          rowBuffer: 0,
          rowSelection: 'multiple',
          rowModelType: 'infinite',
          paginationPageSize: 10,
          maxConcurrentDatasourceRequests: 1,
          maxBlocksInCache: 1,
          cacheBlockSize: 10,
          rowHeight: 40
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


  taskGridReady(params) {
      this.gridApi = params.api;
      const size = Constants.paginationSize;
      this.gridOptions.api.showNoRowsOverlay();
      const dataSource = {
          getRows: (params) => {
              const page = this.gridApi.paginationGetCurrentPage();
              this.taskService.getCompleteTaskForPagination(page, size)
                  .subscribe(
                      resp => {
                          console.log('Res...', resp);
                          console.log('Task COunt...', this.taskCount);
                          //this.gridOptions.suppressNoRowsOverlay = false;
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
      this.taskService.getCompleteTaskCount()
          .subscribe
          (
              resp => {
                  this.taskCount = resp.taskCount;
                  console.log('task count', this.taskCount);
              }
          );
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
      this.editIndex = $event.rowIndex;
      if ($event.node.data) {
          this.selectedTask = $event.node.data.priority;
          this.selectedStatus = $event.node.data.completedStatus;
          this.taskId = $event.node.data.id;
          this.title = $event.node.data.title;
          this.compDate = $event.node.data.completedDate;
          this.isEdit = true;
      }
  }
}

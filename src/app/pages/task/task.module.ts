import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskCreateComponent } from './task-create/task-create.component';
import { NeedAuthGuard } from 'src/app/common/services/auth.guard';
import { SharedModule } from 'src/app/common/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { TaskService } from './task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { CompleteTaskListComponent } from './complete-task-list/complete-task-list.component';


const routes = [
  {
    path: 'task-create',
    component: TaskCreateComponent,
    canActivate: [NeedAuthGuard]
  },
  {
    path: 'task-list',
    component: TaskListComponent,
    canActivate: [NeedAuthGuard]
  },
  {
    path: 'comp-task-list',
    component: CompleteTaskListComponent,
    canActivate: [NeedAuthGuard]
  }
];

@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskListComponent,
    CompleteTaskListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([])
  ],
  providers: [
    TaskService,
    DatePipe
  ]
})
export class TaskModule { }

import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TaskService extends ApiService {

  createTask(
    title: string,
    expectedDate: string,
    priority: string
  ): Observable<HttpEvent<{}>> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken()
      })
    };

    const data = {
      title: title,
      expectedDate: expectedDate,
      priority: priority
    }
    return this.http.post<any>(this.apiRoot + 'task/create', data, httpOptions);
  }

  getTaskCount(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken()
      })
    };

    return this.http.get<any>(this.apiRoot + 'tasks/count', httpOptions);
  }

  getCompleteTaskCount(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken()
      })
    };

    return this.http.get<any>(this.apiRoot + 'tasks/complete/count', httpOptions);
  }

  getTaskForPagination(page: number, size: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken()
      })
    };

    return this.http.get<any>(this.apiRoot + 'tasks/pagination/' + page + "/" + size, httpOptions);
  }

  getCompleteTaskForPagination(page: number, size: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken()
      })
    };

    return this.http.get<any>(this.apiRoot + 'tasks/complete/pagination/' + page + "/" + size, httpOptions);
  }

  completeTask(ids: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken(),
        'SessionId': this.currentUserService.getSessionId()
      })
    };
    const formdata: FormData = new FormData();
    formdata.append('ids', ids);

    return this.http.put<any>(this.apiRoot + 'tasks/approve/selected', formdata, httpOptions);
  }

  deleteTask(ids: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken(),
        'SessionId': this.currentUserService.getSessionId()
      })
    };
    const formdata: FormData = new FormData();
    formdata.append('ids', ids);

    return this.http.put<any>(this.apiRoot + 'tasks/delete/selected', formdata, httpOptions);
  }

  updateTask(
    title: string,
    expectedDate: string,
    completeDate: string,
    priority: string,
    compStatus: string,
    id: string):
    Observable<any> {

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.currentUserService.getAccessToken()
      })
    };

    const taskData = {
      id: id,
      title: title,
      expectedDate: expectedDate,
      priority: priority,
      completedStatus: compStatus,
      completedDate: completeDate
    }

    const formdata: FormData = new FormData();
    formdata.append('task', JSON.stringify(taskData));

    return this.http.put<any>(this.apiRoot + 'task/update', formdata, httpOptions);
  }
}

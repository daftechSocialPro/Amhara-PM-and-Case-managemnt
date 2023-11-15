import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectList } from '../../common/common';
import { IActivityAttachment } from './Iactivity';
import { TaskView, TaskMembers, Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  BaseURI: string = environment.baseUrl + "/PM/Task"


  //task 

  createTask(task: Task) {
    return this.http.post(this.BaseURI, task)
  }

  getSingleTask(taskId: String) {

    return this.http.get<TaskView>(this.BaseURI + "/ById?taskId=" + taskId)
  }

  addTaskMembers(taskMemebers: TaskMembers) {

    return this.http.post(this.BaseURI + "/TaskMembers", taskMemebers)
  }

  getEmployeeNoTaskMembers(taskId: String) {

    return this.http.get<SelectList[]>(this.BaseURI + "/selectlsitNoTask?taskId=" + taskId)
  }

  addTaskMemos(taskMemo: any) {
    return this.http.post(this.BaseURI + "/TaskMemo", taskMemo)
  }


}
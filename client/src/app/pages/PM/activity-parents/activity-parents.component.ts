import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectList } from '../../common/common';
import { TaskMembers, TaskView } from '../tasks/task';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { TaskService } from '../tasks/task.service';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddActivitiesComponent } from './add-activities/add-activities.component';
import { IActivityAttachment } from '../tasks/Iactivity';
import { PMService } from '../pm.services';




@Component({
  selector: 'app-activity-parents',
  templateUrl: './activity-parents.component.html',
  styleUrls: ['./activity-parents.component.css']
})
export class ActivityParentsComponent implements OnInit {

  @ViewChild('taskMemoDesc') taskMemoDesc!: ElementRef
  task: TaskView = {};
  parentId: string = "";
  requestFrom: string = "";
  Employees: SelectList[] = [];
  selectedEmployee: SelectList[] = [];
  user!: UserView;
  isUserTaskMember: boolean = false;
  toast!: toastPayload
  attachments !: IActivityAttachment[]

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private pmService: PMService

  ) { }

  ngOnInit(): void {

    this.parentId = this.route.snapshot.paramMap.get('parentId')!
    this.requestFrom = this.route.snapshot.paramMap.get('requestFrom')!
    this.getSingleTask();
    this.ListofEmployees();
    this.user = this.userService.getCurrentUser();
    this.getAttachments()

  }

  getDateDiff(startDate: string) {
    var date = this.commonService.getDataDiff(startDate, new Date().toString())
    return date.day + " days " + date.hour + " hours " + date.minute + " minutes a go "
  }

  getAttachments() {

    this.pmService.getActivityAttachments(this.parentId).subscribe({
      next: (res) => {
        this.attachments = res
        console.log('attachments', res)
      }, error: (err) => {
        console.error(err)
      }

    })
  }

  ListofEmployees() {

    this.taskService.getEmployeeNoTaskMembers(this.parentId).subscribe({
      next: (res) => {
        this.Employees = res
      }
      , error: (err) => {
        console.error(err)
      }
    })

  }



  getSingleTask() {

    this.taskService.getSingleTask(this.parentId).subscribe({
      next: (res) => {
        this.task = res
        this.selectedEmployee = []
        if (this.task.TaskMembers!.find(x => x.EmployeeId?.toLowerCase() == this.user.EmployeeId.toLowerCase())) {
          this.isUserTaskMember = true;
        }
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  selectEmployee(event: SelectList) {
    this.selectedEmployee.push(event)
    this.Employees = this.Employees.filter(x => x.Id != event.Id)

  }

  removeSelected(emp: SelectList) {
    this.selectedEmployee = this.selectedEmployee.filter(x => x.Id != emp.Id)
    this.Employees.push(emp)

  }


  AddMembers() {

    let taskMembers: TaskMembers = {
      Employee: this.selectedEmployee,
      TaskId: this.parentId,
      RequestFrom: this.requestFrom
    }

    this.taskService.addTaskMembers(taskMembers).subscribe({
      next: (res) => {
        this.toast = {
          message: "Members added Successfully",
          title: 'Successfully Added.',
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
        this.getSingleTask();
        this.ListofEmployees();

      }, error: (err) => {
        this.toast = {
          message: err.message,
          title: 'Network Error.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
        console.error(err)
      }
    })
  }
  getImage(value: string) {
    return this.commonService.createImgPath(value)
  }

  taskMemo(value: string) {


    let taskMemo: any = {
      EmployeeId: this.user.EmployeeId,
      Description: value,
      TaskId: this.parentId,
      RequestFrom: this.requestFrom,
    }

    return this.taskService.addTaskMemos(taskMemo).subscribe({
      next: (res) => {
        this.toast = {
          message: "Task Memo added Successfully",
          title: 'Successfully Added.',
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
        this.taskMemoDesc.nativeElement.value = '';
        this.getSingleTask()
      }
      , error: (err) => {
        this.toast = {
          message: err.message,
          title: 'Network Error.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
      }
    })


  }

  addActivity() {
    let modalRef = this.modalService.open(AddActivitiesComponent, { size: "xl", backdrop: 'static' })
    modalRef.componentInstance.task = this.task
    modalRef.componentInstance.requestFrom = this.requestFrom;
    modalRef.componentInstance.requestFromId = this.parentId;
  }

  getFilePath(value: string) {

    return this.commonService.createImgPath(value);
  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTasksComponent } from '../../tasks/add-tasks/add-tasks.component';
import { AddActivitiesComponent } from '../../activity-parents/add-activities/add-activities.component';
import { ActivityTargetComponent } from '../../view-activties/activity-target/activity-target.component';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { TaskView } from '../../tasks/task';
import { TaskService } from '../../tasks/task.service';
import { ActivityView } from '../../view-activties/activityview';
import { PlanService } from '../plan.service';
import { PlanSingleview } from '../plans';
import { GetStartEndDate } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { AssignTargetToBranchComponent } from './assign-target-to-branch/assign-target-to-branch.component';
import { AssignEmployeesActivityComponent } from './assign-employees-activity/assign-employees-activity.component';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { PMService } from '../../pm.services';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
  items: number[] = Array(13).fill(0);
  items2: number[] = Array(4).fill(0);
  planId!: string;
  
  exportingToExcel = false;
  Plans!: PlanSingleview
  user!: UserView
  plan!: PlanSingleview
  planTasks: Map<string, any[]> = new Map<string, any[]>();
  taskActivities: Map<string, any[]> = new Map<string, any[]>();
  subOrg: any
  actParentActivities:Map<string, any[]> = new Map<string, any[]>();


  filterBy:number=1

  constructor(
   
    private activatedROute: ActivatedRoute,
    private planService: PlanService,
    private taskService: TaskService,
    private userService: UserService,
    private modalService : NgbModal,
    private router : Router,
    private orgService: OrganizationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private pmService: PMService,
    
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.planId = this.activatedROute.snapshot.paramMap.get('planId')!
    this.getPlans()
    this.getSubOrg(this.user.SubOrgId)
  }


  onFilterByChange(){
    if (this.filterBy==0){
      this.items= Array(36).fill(0);
      this.items2= Array(16).fill(0);
    }else  {
      this.items= Array(12).fill(0);
      this.items2= Array(4).fill(0);
    }
  }


  getPlans() {
    this.planService.getSinglePlans(this.planId).subscribe({
      next: (res) => {
        console.log("projects", res)
        this.Plans = res

        this.ListTask(this.planId);

        console.log('this.planTasks: ', this.planTasks);

      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getSingleTaskActivities(taskId: string) {
    this.taskService.getSingleTask(taskId).subscribe({
      next: (res) => {
        if (res.ActivityViewDtos !== undefined) {
          const result = res.ActivityViewDtos;
          result.forEach((actParent) => {
            
            if (actParent.Id !== undefined) {
              console.log('actparent',actParent)
              this.getSingleParentActivities(actParent.Id)
            }  
          });
          this.taskActivities.set(taskId, result);
        }


      }, error: (err) => {
        console.error(err)
      }
    })

  }

  getSingleParentActivities(actparentId: string) {
    this.taskService.getSingleActivityParent(actparentId).subscribe({
      next: (res) => {
        if (res !== undefined) {
          const result = res;
          this.actParentActivities.set(actparentId, result);
        }
      }, error: (err) => {
        console.error(err)
      }
    })

  }
  ListTask(planId: string) {

    this.planService.getSinglePlans(planId).subscribe({
      next: (res) => {
        this.plan = res
        const result = res.Tasks
        result.forEach((task) => {
          if (task.Id !== undefined) {
            this.getSingleTaskActivities(task.Id)
          }

        });

        this.planTasks.set(planId, result);
        console.log('this.taskActivities: ', this.taskActivities);

      }
    })
  }

  addTask() {
    let modalRef = this.modalService.open(AddTasksComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.plan = this.plan
    console.log('this.plan: ', this.plan);
    modalRef.result.then((res) => {
      this.getPlans()
    })

  }
  editTask(task: TaskView) {
    let modalRef = this.modalService.open(AddTasksComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.plan = this.plan
    modalRef.componentInstance.task = task
    modalRef.result.then((res) => {
      this.getPlans()
    })

  }

  deleteTask(taskId: string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Task?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.taskService.deleteTask(taskId).subscribe({
          next: (res) => {

            if (res.Success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.Message });
              this.getPlans()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.Message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });


  }


  addActivity(task:TaskView) {
    let modalRef = this.modalService.open(AddActivitiesComponent, { size: "xl", backdrop: 'static' })

    var dateTime : GetStartEndDate={
      fromDate:this.Plans.StartDate.toString(),
      endDate:this.Plans.EndDate.toString()
    }

    console.log(task)
    modalRef.componentInstance.task = task
    modalRef.componentInstance.requestFrom = "ACTIVITY";
    modalRef.componentInstance.requestFromId = task.Id;
    modalRef.componentInstance.dateAndTime = dateTime
    modalRef.result.then((res) => {
      this.getPlans()
    })

    }

  editActivity(task:TaskView, activity:ActivityView) {
    let modalRef = this.modalService.open(AddActivitiesComponent, { size: "xl", backdrop: 'static' })

    var dateTime : GetStartEndDate={
      fromDate:this.Plans.StartDate.toString(),
      endDate:this.Plans.EndDate.toString()
    }

    
    modalRef.componentInstance.task = task
    modalRef.componentInstance.requestFrom = "ACTIVITY";
    modalRef.componentInstance.requestFromId = task.Id;
    modalRef.componentInstance.dateAndTime = dateTime
    modalRef.componentInstance.activity = activity
    modalRef.result.then((res) => {
      this.getPlans()
    })

  }


  deleteActivity(activityId: string, taskId: string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Activity?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pmService.deleteActivity(activityId, taskId).subscribe({
          next: (res) => {

            if (res.Success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.Message });
              this.getPlans()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.Message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });


  }

    
  AssignTarget(actview:ActivityView ) {
    let modalRef = this.modalService.open(ActivityTargetComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.activity = actview
  }
  AssignTargetToBranch(actview:ActivityView){

    let modalRef = this.modalService.open(AssignTargetToBranchComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.activity=actview

  }
  
  exportAsExcel(name:string) {
    this.exportingToExcel= true
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}
routeToActDetail(act: string){

   
  this.router.navigate(['/activityDetail',act]);

}

getSubOrg(subOrgId: string){
  this.orgService.getSubOrgById(subOrgId).subscribe({
    next:(res) => {
      this.subOrg = res
      console.log('this.subOrg : ', this.subOrg );
    },
    error: (err) => {
      console.error(err)
    }
  })
}

TaskDetail(task : TaskView ){
  const taskId = task ? task.Id :null
  if(!task.HasActivity){
    this.router.navigate(['activityparent',{parentId:taskId,requestFrom:'TASK'}])
  }
  else{
    this.router.navigate(['activityparent',{parentId:taskId,requestFrom:'ACTIVITY'}])
  }
}
AssignEmployee (act: ActivityView){


  let modalRef = this.modalService.open(AssignEmployeesActivityComponent,{size:'lg',backdrop:'static'})
  modalRef.componentInstance.activity = act 
  modalRef.result.then(()=>{
    this.getPlans()
  })


}

}






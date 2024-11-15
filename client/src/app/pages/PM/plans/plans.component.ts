import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProgramService } from '../programs/programs.services';
import { AddPlansComponent } from './add-plans/add-plans.component';
import { PlanService } from './plan.service';
import { PlanView } from './plans';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  user!: UserView
  programId!: string;
  Plans: PlanView[] = []
  constructor(
    private modalService: NgbModal,
    private planService: PlanService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public translate: TranslateService
    ) { }


  ngOnInit(): void {

    this.programId = this.activeRoute.snapshot.paramMap.get('programId')!
    this.user = this.userService.getCurrentUser()
    this.listPlans()
  }

  listPlans() {

    this.planService.getPlans(this.user.SubOrgId, this.programId).subscribe({
      next: (res) => {
        console.log("projects", res)
        this.Plans = res
      },
      error: (err) => {
        console.error(err)
      }
    })

  }



  addPlan() {
    let modalRef = this.modalService.open(AddPlansComponent, { size: 'xl', backdrop: 'static' });
    modalRef.result.then((res) => {
      this.listPlans()
    })
  }

  editPlan(plan:PlanView) {
    let modalRef = this.modalService.open(AddPlansComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.plan = plan
    modalRef.result.then((res) => {
      this.listPlans()
    })
  }

  deletePlan(planId: string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Plan?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.planService.deletePlan(planId).subscribe({
          next: (res) => {

            if (res.Success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.Message });
              this.listPlans()
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

  tasks(plan: PlanView) {
    const planId = plan ? plan.Id : null
    if (plan.HasTask) {
      this.router.navigate(['task', { planId: planId }]);
    }
    else {
      this.router.navigate(['activityparent', { parentId: planId, requestFrom: 'PLAN' }])
    }
  }

  applyStyles(act: number, completed: number) {

    let percentage = (completed / act) * 100
    const styles = { 'width': percentage + "%" };
    return styles;
  }

  routeToPlanDetail(planId: string) {

    this.router.navigate(['/planDetail', planId]);
  }

  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }
  

}

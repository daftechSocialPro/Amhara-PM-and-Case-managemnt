import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CaseTypeView } from 'src/app/pages/case/case-type/casetype';
import { CaseService } from 'src/app/pages/case/case.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { SubActivityDetailDto, ActivityDetailDto } from '../../../activity-parents/add-activities/add-activities';
import { PMService } from '../../../pm.services';
import { ActivityView } from '../../../view-activties/activityview';

@Component({
  selector: 'app-assign-target-to-branch',
  templateUrl: './assign-target-to-branch.component.html',
  styleUrls: ['./assign-target-to-branch.component.css']
})
export class AssignTargetToBranchComponent implements OnInit{
  Branches: SelectList[] = [];
  @Input() activity!: ActivityView;
  user!: UserView
  caseTypes : CaseTypeView[]=[]
  selectedCaseType!:string

  actTargets = new FormArray([
    new FormGroup({
      BranchName: new FormControl({ value: 'July (ሃምሌ)', disabled: true }),
      BranchId: new FormControl('',Validators.required),
      Weight: new FormControl(0, Validators.required),
      Target: new FormControl(0, Validators.required),
      Budget: new FormControl(0, Validators.required)
    })
  ])

  constructor(
    private organizationService: OrganizationService,
    private messageService: MessageService,
    private userService: UserService,
    private caseService : CaseService,

    private pmService: PMService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getBranches()
    this.getCaseTypes()

  }

  getCaseTypes (){

    this.caseService.getCaseType(this.user.SubOrgId).subscribe({
      next:(res)=>{
        this.caseTypes = res 

      }
    })

  }

  getBranches() {
    this.organizationService.getOrgBranchSelectList(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.Branches = res
        this.actTargets.removeAt(0)
        this.addTargetForm();
      }, error: (err) => {
        console.error(err)
      }
    })
  }




  addTargetForm() {
    var index = 1
    for (let branch of this.Branches) {
      const target = new FormGroup({
        BranchName: new FormControl(` ${branch.Name} ( ${this.activity.Name} )`),
        BranchId: new FormControl(branch.Id),
        Target: new FormControl(0, Validators.required),
        Budget: new FormControl(0, Validators.required),
        Weight: new FormControl(0, Validators.required)

      });
      this.actTargets.push(target);
      index += 1
    }
  }

  submitTarget() {

    if (this.actTargets.valid) {
      var sumOfTarget = 0
      var sumOfBudget = 0
      var sumOfWeight = 0

      let activityList: SubActivityDetailDto[] = [];

      for (let formValue of this.actTargets.value) {
        sumOfTarget += Number(formValue.Target)
        sumOfBudget += Number(formValue.Budget)
        sumOfWeight += Number(formValue.Weight)


        let actvityP: SubActivityDetailDto = {
          SubActivityDesctiption: formValue.BranchName!,
          StartDate: this.activity.StartDate,
          EndDate: this.activity.EndDate,
          PlannedBudget: formValue.Budget!,
          Weight: formValue.Weight!,
          UnitOfMeasurement: this.activity.UnitOfMeasurmentId,
          PreviousPerformance: this.activity.Begining,
          Goal: formValue.Target!,
          BranchId :formValue.BranchId!

        }


        if (formValue.Budget!=0||formValue.Weight!=0||formValue.Target!=0){
        activityList.push(actvityP);
        }

      }




      let addActivityDto: ActivityDetailDto = {
        ActivityDescription: this.activity.Name,
        HasActivity: true,
        TaskId: this.activity.Id!,
        CreatedBy: this.user.UserID,
        ActivityDetails: activityList,
        CaseTypeId: this.selectedCaseType
      }




      if (this.selectedCaseType ==null) {
        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Case Type Not Selected !!!' })
        return

      }


      if (sumOfWeight != (this.activity.Weight)) {
        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Sum of Activity Weight not equal to target of Activity' })
        return

      }

      if (sumOfTarget != (this.activity.Target)) {
        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Sum of Activity target not equal to target of Activity' })

        return

      }

      if (sumOfBudget != this.activity.PlannedBudget) {
        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Sum of Activity Budget not equal to Planned Budget' })

        return

      }
      console.log('addActivityDto', addActivityDto)

      this.pmService.addActivityParent(addActivityDto).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfully Created.', detail: ' Activity Successfully Created' })

          window.location.reload()

          this.closeModal()
        }, error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Something went wrong.', detail: err.message })


          console.error(err)
        }
      })

    }
    else {


    }
  }
  closeModal() {
    this.activeModal.close()
  }

}

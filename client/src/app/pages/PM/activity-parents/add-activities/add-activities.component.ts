import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../pm.services';
import { TaskView } from '../../tasks/task';
import {  ActivityDetailDto, SubActivityDetailDto } from './add-activities';
declare const $: any

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent implements OnInit {

  @Input() task!: TaskView;
  @Input() requestFrom!: string;
  @Input() requestFromId!: string;
  activityForm!: FormGroup;
  selectedEmployee: SelectList[] = [];
  user !: UserView;
  committees: SelectList[] = [];
  unitMeasurments: SelectList[] = [];
  toast!: toastPayload;
  comitteEmployees : SelectList[]=[];



  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    private orgService: OrganizationService,
    private commonService: CommonService
  ) {

    this.activityForm = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      ActivityDescription: ['', Validators.required],
      PlannedBudget: ['', [Validators.required,Validators.max(this.task?.RemainingBudget!)]],
      Weight: ['', [Validators.required,Validators.max(this.task?.RemianingWeight!)]],
      ActivityType: [''],
      OfficeWork: [0, Validators.required],
      FieldWork: [0, Validators.required],
      UnitOfMeasurement: ['', Validators.required],
      PreviousPerformance: [0, [Validators.required,Validators.max(100),Validators.min(0)]],
      Goal: [0,[Validators.required,Validators.max(100),Validators.min(0)]],
      WhomToAssign: [''],
      TeamId: [null],
      CommiteeId: [null],
      AssignedEmployee: []


    })
  }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

    this.pmService.getComitteeSelectList().subscribe({
      next: (res) => {
        this.committees = res
      }, error: (err) => {
        console.log(err)
      }
    })

    this.orgService.getUnitOfMeasurmentSelectList().subscribe({
      next: (res) => {
        this.unitMeasurments = res
      }, error: (err) => {
        console.log(err)
      }
    })


    $('#StartDate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),

      onSelect: (date: any) => {
      
        this.activityForm.controls['StartDate'].setValue(date[0]._month+"/"+date[0]._day+"/"+date[0]._year)
       
      },
    })
    $('#EndDate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),

      onSelect: (date: any) => {
        this.activityForm.controls['EndDate'].setValue(date[0]._month+"/"+date[0]._day+"/"+date[0]._year)
       
      },
    })

  }

  selectEmployee(event: SelectList) {
    this.selectedEmployee.push(event)
    this.task.TaskMembers = this.task.TaskMembers!.filter(x => x.Id != event.Id)

  }

  removeSelected(emp: SelectList) {

    this.selectedEmployee = this.selectedEmployee.filter(x => x.Id != emp.Id)
    this.task.TaskMembers!.push(emp)

  }

  submit() {
    if(this.requestFrom == "PLAN" || this.requestFrom == "TASK"){
        this.addSubActivity()
    }
    else{
          this.addActivityParent()
    }
  }

  addSubActivity(){
    if (this.activityForm.valid) {
      let actvityP: SubActivityDetailDto = {
        SubActivityDesctiption: this.activityForm.value.ActivityDescription,
        StartDate: this.activityForm.value.StartDate,
        EndDate: this.activityForm.value.EndDate,
        PlannedBudget: this.activityForm.value.PlannedBudget,
        Weight: this.activityForm.value.Weight,
        ActivityType: this.activityForm.value.ActivityType,
        OfficeWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.OfficeWork : this.activityForm.value.ActivityType == 1 ? 100 : 0,
        FieldWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.FieldWork : this.activityForm.value.ActivityType == 2 ? 100 : 0,
        UnitOfMeasurement: this.activityForm.value.UnitOfMeasurement,
        PreviousPerformance: this.activityForm.value.PreviousPerformance,
        Goal: this.activityForm.value.Goal,
        TeamId: this.activityForm.value.TeamId,
        CommiteeId: this.activityForm.value.CommiteeId,
        Employees: this.activityForm.value.AssignedEmployee
      }
      if(this.requestFrom == "PLAN"){
        actvityP.PlanId = this.requestFromId;
      }
      else if(this.requestFrom == "TASK"){
        actvityP.TaskId = this.requestFromId;
      }

      console.log("act",actvityP)

      this.pmService.addSubActivity(actvityP).subscribe({
        next: (res) => {
          this.toast = {
            message: ' Activity Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          window.location.reload()
          this.closeModal()
         
        }, error: (err) => {
          this.toast = {
            message: err.message,
            title: 'Something went wrong.',
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
  }

  addActivityParent(){
    if (this.activityForm.valid) {
      let actvityP: SubActivityDetailDto = {
        SubActivityDesctiption: this.activityForm.value.ActivityDescription,
        StartDate: this.activityForm.value.StartDate,
        EndDate: this.activityForm.value.EndDate,
        PlannedBudget: this.activityForm.value.PlannedBudget,
        Weight: this.activityForm.value.Weight,
        ActivityType: this.activityForm.value.ActivityType,
        OfficeWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.OfficeWork : this.activityForm.value.ActivityType == 1 ? 100 : 0,
        FieldWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.FieldWork : this.activityForm.value.ActivityType == 2 ? 100 : 0,
        UnitOfMeasurement: this.activityForm.value.UnitOfMeasurement,
        PreviousPerformance: this.activityForm.value.PreviousPerformance,
        Goal: this.activityForm.value.Goal,
        TeamId: this.activityForm.value.TeamId,
        CommiteeId: this.activityForm.value.CommiteeId,
        Employees: this.activityForm.value.AssignedEmployee
      }

      if(this.requestFrom == "Plan"){
        actvityP.PlanId = this.requestFromId;
      }
      else if(this.requestFrom == "Task"){
        actvityP.TaskId = this.requestFromId;
      }

      let activityList : SubActivityDetailDto[] = [];
      activityList.push(actvityP);

      let addActivityDto: ActivityDetailDto = {
        ActivityDescription: this.activityForm.value.ActivityDescription,
        HasActivity: false,
        TaskId: this.task.Id!,
        CreatedBy: this.user.UserID,
        ActivityDetails: activityList
      }
      console.log("activity detail", addActivityDto)
      this.pmService.addActivityParent(addActivityDto).subscribe({
        next: (res) => {
          this.toast = {
            message: ' Activity Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          window.location.reload()
          this.commonService.showToast(this.toast);
          this.closeModal()
        }, error: (err) => {
          this.toast = {
            message: err.message,
            title: 'Something went wrong.',
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
  }




  closeModal() {
    this.activeModal.close()
  }

  onCommiteChange(comitteId :string){

    debugger

    this.pmService.getComitteEmployees(comitteId).subscribe({
      next:(res)=>{
        this.comitteEmployees = res 
      },
      error:(err)=>{    
      }
    })
  }


}

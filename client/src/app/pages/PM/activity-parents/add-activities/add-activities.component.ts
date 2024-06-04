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
import { ActivityView } from '../../view-activties/activityview';
import { TranslateService } from '@ngx-translate/core';
declare const $: any

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent implements OnInit {

  @Input() activity!: ActivityView
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
  employeeId!: string[]
  isClassfiedtoBranch!:boolean




  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    private orgService: OrganizationService,
    private commonService: CommonService,
    public translate: TranslateService
  ) {}



  onClassfiedBranch(){
    this.isClassfiedtoBranch = this.activityForm.value.IsClassfiedToBranch

  }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    console.log("this.activity",this.activity)
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

    this.orgService.getUnitOfMeasurmentSelectList(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.unitMeasurments = res
      }, error: (err) => {
        console.log(err)
      }
    })

    if(this.activity){
      this.isClassfiedtoBranch = this.activity.IsClassfiedToBranch
      this.activityForm = this.formBuilder.group({
        StartDate: [this.activity.StartDateEth!, Validators.required],
        EndDate: [this.activity.EndDateEth!, Validators.required],
        ActivityDescription: [this.activity.Name, Validators.required],
        PlannedBudget: [this.activity.PlannedBudget, [Validators.required,Validators.max(this.task?.RemainingBudget!)]],
        Weight: [this.activity.Weight, [Validators.required,Validators.max(this.task?.RemianingWeight!)]],
        ActivityType: [this.activity.ActivityType],
        OfficeWork: [this.activity.OfficeWork, Validators.required],
        FieldWork: [this.activity.FieldWork, Validators.required],
        UnitOfMeasurement: [this.activity.UnitOfMeasurmentId, Validators.required],
        PreviousPerformance: [this.activity.Begining, [Validators.required,Validators.max(100),Validators.min(0)]],
        Goal: [this.activity.Target,[Validators.required,Validators.max(100),Validators.min(0)]],
        WhomToAssign: [''],
        CommiteeId: [this.activity.CommiteeId],
        AssignedEmployee: [this.activity.Members?.map(member => member.EmployeeId!) || []],
        IsClassfiedToBranch:[this.activity.IsClassfiedToBranch,Validators.required]
  
      })
    }
    else{
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
        AssignedEmployee: [],
        IsClassfiedToBranch:[false,Validators.required]
  
      })
    }

    
    this.pmService.getComitteeSelectList(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.committees = res
        if(this.activity){
          if(this.activity.IsClassfiedToBranch == false){
            if(this.committees.find(x => x.Id === this.activity.CommiteeId)){
              this.activityForm.controls['CommiteeId'].setValue(this.activity.CommiteeId)
              this.activityForm.controls['WhomToAssign'].setValue(0)
            }
            else{
              this.activityForm.controls['WhomToAssign'].setValue(1)
            }
          }
          
        }
      }, error: (err) => {
        console.log(err)
      }
    })

    if(this.activity){
      this.checkActivityType()
    }

  }

  checkActivityType(){
    
    if(this.activity.ActivityType == "Both"){
      this.activityForm.controls['ActivityType'].setValue(0)
    }
    if(this.activity.ActivityType == "Office_Work"){
      this.activityForm.controls['ActivityType'].setValue(1)
    }
    if(this.activity.ActivityType == "Fild_Work"){
      this.activityForm.controls['ActivityType'].setValue(2)
    }
    
  }
  checkAssignType(){
    const firstMemberId = this.activity.Members?.[0]?.Id;
    
    this.employeeId = this.activity.Members?.map(member => member.EmployeeId!) || [];
    console.log("employeeIds", this.employeeId)
    return 1

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
    this.addSubActivity()
    // if(this.requestFrom == "PLAN" || this.requestFrom == "TASK"){
    //     this.addSubActivity()
    // }
    // else{
    //       this.addActivityParent()
    // }
  }

  addSubActivity(){
    if (this.activityForm.valid) {
      if(this.activity){
        let actvityP: SubActivityDetailDto = {
          Id: this.activity.Id,
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
          TaskId : this.task.Id,
          CommiteeId: this.activityForm.value.CommiteeId,
          IsClassfiedToBranch:this.activityForm.value.IsClassfiedToBranch,
          Employees: this.activityForm.value.AssignedEmployee
        }
        // if(this.requestFrom == "PLAN"){
        //   actvityP.PlanId = this.requestFromId;
        // }
        // else if(this.requestFrom == "TASK"){
        //   actvityP.TaskId = this.requestFromId;
        // }
  
        console.log("act",actvityP)
  
        this.pmService.editActivity(actvityP).subscribe({
          next: (res) => {
            this.toast = {
              message: ' Activity Successfully Updated',
              title: 'Successfully Updated.',
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
      else{
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
          TaskId : this.task.Id,
          CommiteeId: this.activityForm.value.CommiteeId,
          IsClassfiedToBranch:this.activityForm.value.IsClassfiedToBranch,
          Employees: this.activityForm.value.AssignedEmployee
        }
        // if(this.requestFrom == "PLAN"){
        //   actvityP.PlanId = this.requestFromId;
        // }
        // else if(this.requestFrom == "TASK"){
        //   actvityP.TaskId = this.requestFromId;
        // }
  
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
  }

  // addActivityParent(){
  //   if (this.activityForm.valid) {
  //     let actvityP: SubActivityDetailDto = {
  //       SubActivityDesctiption: this.activityForm.value.ActivityDescription,
  //       StartDate: this.activityForm.value.StartDate,
  //       EndDate: this.activityForm.value.EndDate,
  //       PlannedBudget: this.activityForm.value.PlannedBudget,
  //       Weight: this.activityForm.value.Weight,
  //       ActivityType: this.activityForm.value.ActivityType,
  //       OfficeWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.OfficeWork : this.activityForm.value.ActivityType == 1 ? 100 : 0,
  //       FieldWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.FieldWork : this.activityForm.value.ActivityType == 2 ? 100 : 0,
  //       UnitOfMeasurement: this.activityForm.value.UnitOfMeasurement,
  //       PreviousPerformance: this.activityForm.value.PreviousPerformance,
  //       Goal: this.activityForm.value.Goal,
  //       TeamId: this.activityForm.value.TeamId,
  //       CommiteeId: this.activityForm.value.CommiteeId,
  //       IsClassfiedToBranch:this.activityForm.value.IsClassfiedToBranch,
  //       TaskId : this.task.Id,  
  //       Employees: this.activityForm.value.AssignedEmployee
  //     }

  //     // if(this.requestFrom == "Plan"){
  //     //   actvityP.PlanId = this.requestFromId;
  //     // }
  //     // else if(this.requestFrom == "Task"){
  //     //   actvityP.TaskId = this.requestFromId;
  //     // }

  //     let activityList : SubActivityDetailDto[] = [];
  //     activityList.push(actvityP);

  //     let addActivityDto: ActivityDetailDto = {
  //       ActivityDescription: this.activityForm.value.ActivityDescription,
  //       HasActivity: false,
  //       TaskId: this.task.Id!,
  //       CreatedBy: this.user.UserID,
  //       ActivityDetails: activityList
  //     }
  //     console.log("activity detail", addActivityDto)
  //     this.pmService.addActivityParent(addActivityDto).subscribe({
  //       next: (res) => {
  //         this.toast = {
  //           message: ' Activity Successfully Created',
  //           title: 'Successfully Created.',
  //           type: 'success',
  //           ic: {
  //             timeOut: 2500,
  //             closeButton: true,
  //           } as IndividualConfig,
  //         };
  //         window.location.reload()
  //         this.commonService.showToast(this.toast);
  //         this.closeModal()
  //       }, error: (err) => {
  //         this.toast = {
  //           message: err.message,
  //           title: 'Something went wrong.',
  //           type: 'error',
  //           ic: {
  //             timeOut: 2500,
  //             closeButton: true,
  //           } as IndividualConfig,
  //         };
  //         this.commonService.showToast(this.toast);
  //         console.error(err)
  //       }
  //     })
  //   }
  // }




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

  weightChange(weight:string){

    if (this.task){
      if ( Number(weight)>this.task.RemianingWeight){

        this.toast = {
          message: "Weight can not be greater than Remaining weight",
          title: 'Form Validation.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);

        this.activityForm.controls['Weight'].setValue('')
      }
    }
  }


  
  budgetChange(budget:string){

    if (this.task){
      if ( Number(budget)>this.task.RemainingBudget){

        this.toast = {
          message: "Budget can not be greater than Remaining Budget",
          title: 'Form Validation.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);

        this.activityForm.controls['PlannedBudget'].setValue('')
      }
    }
  }


}

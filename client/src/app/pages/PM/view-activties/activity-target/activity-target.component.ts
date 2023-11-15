import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../pm.services';
import { ActivityView, TargetDivisionDto,ActivityTargetDivisionDto } from '../activityview';

@Component({
  selector: 'app-activity-target',
  templateUrl: './activity-target.component.html',
  styleUrls: ['./activity-target.component.css']
})
export class ActivityTargetComponent implements OnInit {

  @Input() activity!: ActivityView;
  targetForm !: FormGroup;
  user! : UserView;
  toast!: toastPayload;
  actTargets = new FormArray([
    new FormGroup({
      monthName: new FormControl({ value: 'July (ሃምሌ)', disabled: true }),
      monthValue: new FormControl(0, Validators.required),
      Target: new FormControl(0, Validators.required),
      Budget: new FormControl(0, Validators.required)
    })
  ])

  months: string[] = [
    'August (ነሃሴ)',
    'September (መስከረም)',
    'October (ጥቅምት)',
    'November (ህዳር)',
    'December (ታህሳስ)',
    'January (ጥር)',
    'February (የካቲት)',
    'March (መጋቢት)',
    'April (ሚያዚያ)',
    'May (ግንቦት)',
    'June (ሰኔ)'
  ];

  constructor(
    private activeModal: NgbActiveModal,
    private commonService: CommonService,
    private userService : UserService,
    private pmService : PMService) { }

  ngOnInit(): void {
    this.addTargetForm();
    this.user = this.userService.getCurrentUser();
  }

  addTargetForm() {
    var index = 1
    for (let month of this.months) {
      const target = new FormGroup({
        monthName: new FormControl({ value: month, disabled: true }),
        monthValue: new FormControl(index, Validators.required),
        Target: new FormControl(0, Validators.required),
        Budget: new FormControl(0, Validators.required)
      });
      this.actTargets.push(target);
      index += 1
    }
  }

  submitTarget() {
 
   if(this.actTargets.valid){
    var sumOfTarget = 0
    var sumOfBudget = 0

    let  targetDivisionDtos:TargetDivisionDto[]=[]
   
    for (let formValue of this.actTargets.value) {
      sumOfTarget += Number(formValue.Target)
      sumOfBudget += Number(formValue.Budget)

      let  targetDivisionDto : TargetDivisionDto ={
        Order: Number(formValue.monthValue),
        Target : Number(formValue.Target),
        TargetBudget : Number(formValue.Budget)
      }

      targetDivisionDtos.push(targetDivisionDto)
    }

    let ActivityTargetDivisionDto : ActivityTargetDivisionDto={

      ActiviyId :this.activity.Id,
      CreatedBy : this.user.UserID,
      TargetDivisionDtos :targetDivisionDtos
    }

  

    

    if (sumOfTarget != (this.activity.Target - this.activity.Begining)) {

      this.toast = {
        message: 'Sum of Activity target not equal to target of Activity',
        title: 'Verfication Failed.',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);

      return

    }

    if (sumOfBudget != this.activity.PlannedBudget) {

      this.toast = {
        message: 'Sum of Activity Budget not equal to Planned Budget',
        title: 'Verfication Failed.',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);

      return

    }


    this.pmService.addActivityTargetDivision(ActivityTargetDivisionDto).subscribe({
      next:(res)=>{
        this.toast = {
          message: 'Activity Target Assigned successFully',
          title: 'Success fully created.',
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
       this.closeModal()
       window.location.reload()

      },error:(err)=>{
        this.toast = {
          message: 'Internal Server Error',
          title: 'Something went wrong.',
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
  else {


  }
  }
  closeModal() {
    this.activeModal.close()
  }


}
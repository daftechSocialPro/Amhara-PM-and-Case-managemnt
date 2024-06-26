import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { BudgetYear, BudgetYearwithoutId, ProgramBudgetYear } from '../../common';
import { BudgetYearService } from '../budget-year.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { TranslateService } from '@ngx-translate/core';
declare const $: any
@Component({
  selector: 'app-add-budgetyear',
  templateUrl: './add-budgetyear.component.html',
  styleUrls: ['./add-budgetyear.component.css']
})
export class AddBudgetyearComponent implements OnInit {

  toast!: toastPayload;
  @Input() programBudget!: ProgramBudgetYear;
  @Input() budgetYear!: BudgetYear
  BudgetYearForm!: FormGroup;
  @Output() result: boolean = false;
  user ! : UserView

  constructor(
    private formBuilder: FormBuilder,
    private budgetYearService: BudgetYearService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private userService : UserService,
  public translate: TranslateService) {}

  ngOnInit(): void {


    this.user = this.userService.getCurrentUser()
    $('#Fromdate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),

      onSelect: (date: any) => {
      
        this.BudgetYearForm.controls['Fromdate'].setValue(date[0]._month+"/"+date[0]._day+"/"+date[0]._year)
       
      },
    })
    $('#ToDate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),

      onSelect: (date: any) => {
        this.BudgetYearForm.controls['ToDate'].setValue(date[0]._month+"/"+date[0]._day+"/"+date[0]._year)
       
      },
    })

    if(this.budgetYear){
      this.BudgetYearForm = this.formBuilder.group({

        Year: [this.budgetYear.Year, Validators.required],
        Fromdate: [this.budgetYear.FromDate, Validators.required],
        ToDate: [this.budgetYear.ToDate, Validators.required],
        Remark: [this.budgetYear.Remark]
        
      })
    }
    else{
      this.BudgetYearForm = this.formBuilder.group({

        Year: ['', Validators.required],
        Fromdate: ['', Validators.required],
        ToDate: ['', Validators.required],
        Remark: ['']
        
      })
    }

  }


  submit() {

    if (this.BudgetYearForm.valid) {
      
      if(this.budgetYear){
        let by: BudgetYear = {

          Id: this.budgetYear.Id,
          Year: this.BudgetYearForm.value.Year,
          FromDate: this.BudgetYearForm.value.Fromdate,
          ToDate: this.BudgetYearForm.value.ToDate,
          Remark: this.BudgetYearForm.value.Remark,
          ProgramBudgetYearId: this.programBudget.Id!,
          CreatedBy:this.user.UserID
  
        }
  
        this.budgetYearService.EditBudgetYear(by).subscribe({
  
          next: (res) => {
  
            this.toast = {
              message: 'Budget Year Successfully Updated',
              title: 'Successfully Updated.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
  
            this.result = true;
            this.modalClose();
            this.BudgetYearForm = this.formBuilder.group({
  
              Year: [null],
              Fromdate: [null],
              ToDate: [null],
              Remark: ['']
            })
  
          }, error: (err) => {
            this.toast = {
              message: err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
  
  
          }
        }
        );
      }
      else{
        let by: BudgetYearwithoutId = {

          Year: this.BudgetYearForm.value.Year,
          FromDate: this.BudgetYearForm.value.Fromdate,
          ToDate: this.BudgetYearForm.value.ToDate,
          Remark: this.BudgetYearForm.value.Remark,
          ProgramBudgetYearId: this.programBudget.Id!,
          CreatedBy:this.user.UserID
  
        }
  
        this.budgetYearService.CreateBudgetYear(by).subscribe({
  
          next: (res) => {
  
            this.toast = {
              message: ' Budget Year Successfully Created',
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
  
            this.result = true;
            this.modalClose();
            this.BudgetYearForm = this.formBuilder.group({
  
              Year: [null],
              Fromdate: [null],
              ToDate: [null],
              Remark: ['']
            })
  
          }, error: (err) => {
            this.toast = {
              message: err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
          }
        }
        );
      }

      


    }
    else {
      this.toast = {
        message: 'Please check your form',
        title: 'Form Error.',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);
    }

  }

  modalClose() {
    this.activeModal.close()
  }

}

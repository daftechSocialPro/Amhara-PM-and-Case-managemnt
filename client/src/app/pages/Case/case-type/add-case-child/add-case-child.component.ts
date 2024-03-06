import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { CaseTypeView,CaseType } from '../casetype';

@Component({
  selector: 'app-add-case-child',
  templateUrl: './add-case-child.component.html',
  styleUrls: ['./add-case-child.component.css']
})
export class AddCaseChildComponent implements OnInit {

  @Input() caseChild!:CaseTypeView

  @Input() CaseType!: CaseTypeView
  caseForm !: FormGroup;
  user!: UserView;
  orderNumber! : number ; 

  toast !: toastPayload;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private userService: UserService,
    private caseService: CaseService) {





  }
  ngOnInit(): void {

    if(this.caseChild){

      console.log(this.caseChild)

      this.caseForm = this.formBuilder.group({

        CaseTypeTitle: [this.caseChild.CaseTypeTitle, Validators.required],
        TotalPayment: [this.caseChild.TotalPayment, Validators.required],
        Counter: [this.caseChild.Counter, Validators.required],
        MeasurementUnit: [this.caseChild.MeasurementUnit, Validators.required],
        Code: [this.caseChild.Code],

        Remark: [this.caseChild.Remark],

      })
    }else{
      this.caseForm = this.formBuilder.group({

        CaseTypeTitle: ['', Validators.required],
        TotalPayment: [0, Validators.required],
        Counter: [0, Validators.required],
        MeasurementUnit: ['', Validators.required],
        Code: [''],
        OrderNumber: [{value:'',disabled: true}, [Validators.required]],
        Remark: [''],
  
      })

    }
    this.user = this.userService.getCurrentUser()
    this.caseService.getOrderNumber(this.CaseType.Id).subscribe({
      next:(res)=>{
        this.caseForm.controls['OrderNumber'].setValue(res)
        this.orderNumber = res 
      },error:(err)=>{
        console.error(err)
      }
    })
  }
  submit() {
    if (this.caseForm.valid) {
      let caseType: CaseType = {
        ParentCaseTypeId : this.CaseType.Id, 
        OrderNumber : this.orderNumber,  
        CaseTypeTitle: this.caseForm.value.CaseTypeTitle,
        Code: this.caseForm.value.Code,
        TotalPayment: this.caseForm.value.TotalPayment,
        Counter: this.caseForm.value.Counter,
        MeasurementUnit: this.caseForm.value.MeasurementUnit,
       // CaseForm: this.caseForm.value.CaseForm,
        Remark: this.caseForm.value.Remark,
        CreatedBy: this.user.UserID,
        SubsidiaryOrganizationId: this.user.SubOrgId
      }
      console.log(caseType)
      this.caseService.createCaseType(caseType).subscribe({
        next: (res) => {
          this.toast = {
            message: "case type Child Successfully Creted",
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal()
        }, error: (err) => {
          this.toast = {
            message: 'Something went Wrong',
            title: 'Network error.',
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
      alert()
    }

  }
  Update() {

    if (this.caseForm.valid) {

      let caseType: CaseType = {

        Id:this.caseChild.Id,

        ParentCaseTypeId : this.CaseType.Id, 
        OrderNumber : this.orderNumber,  
        CaseTypeTitle: this.caseForm.value.CaseTypeTitle,
        Code: this.caseForm.value.Code,
        TotalPayment: this.caseForm.value.TotalPayment,
        Counter: this.caseForm.value.Counter,
        MeasurementUnit: this.caseForm.value.MeasurementUnit,
       // CaseForm: this.caseForm.value.CaseForm,
        Remark: this.caseForm.value.Remark,
        SubsidiaryOrganizationId: this.user.SubOrgId


      }

      console.log(caseType)

      this.caseService.updateCaseType(caseType).subscribe({

        next: (res) => {

          this.toast = {
            message: "case type Child Successfully Updated",
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal()



        }, error: (err) => {
          this.toast = {
            message: 'Something went Wrong',
            title: 'Network error.',
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
      alert()
    }

  }
  closeModal() {

    this.activeModal.close()
  }

}

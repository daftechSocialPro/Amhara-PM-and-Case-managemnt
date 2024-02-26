import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { CaseType, CaseTypeView } from '../casetype';

@Component({
  selector: 'app-add-case-type',
  templateUrl: './add-case-type.component.html',
  styleUrls: ['./add-case-type.component.css']
})
export class AddCaseTypeComponent {

  @Input() caseType!:CaseTypeView

  caseForm !: FormGroup;
  user!: UserView

  toast !: toastPayload;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
     private userService: UserService,
    private caseService: CaseService) {


  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

    if(this.caseType){

      console.log("hkshdkfds",this.caseForm,this.caseType)
      this.caseForm = this.formBuilder.group({
        CaseTypeTitle: [this.caseType.CaseTypeTitle, Validators.required],
        TotalPayment: [this.caseType.TotalPayment, Validators.required],
        Counter: [this.caseType.Counter, Validators.required],
        MeasurementUnit: [this.caseType.MeasurementUnit, Validators.required],
        Code: [this.caseType.Code, Validators.required],

        Remark: [this.caseType.Remark],

      })
    }
    else {

    this.caseForm = this.formBuilder.group({
      CaseTypeTitle: ['', Validators.required],
      TotalPayment: [0, Validators.required],
      Counter: [0, Validators.required],
      MeasurementUnit: ['', Validators.required],
      Code: ['', Validators.required],
      CaseForm: ['', Validators.required],
      Remark: [''],

    })
  }
  }
  submit() {
    
    if (this.caseForm.valid) {
      let caseType: CaseType = {
        CaseTypeTitle: this.caseForm.value.CaseTypeTitle,
        Code: this.caseForm.value.Code,
        TotalPayment: this.caseForm.value.TotalPayment,
        Counter: this.caseForm.value.Counter,
        MeasurementUnit: this.caseForm.value.MeasurementUnit,
        CaseForm: this.caseForm.value.CaseForm,
        Remark: this.caseForm.value.Remark,
        CreatedBy: this.user.UserID,
        SubsidiaryOrganizationId: this.user.SubOrgId
      }
      this.caseService.createCaseType(caseType).subscribe({
        next: (res) => {
          this.toast = {
            message: "case type Successfully Creted",
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

  update(){

    if (this.caseForm.valid) {

      let caseType: CaseType = {

        Id:this.caseType.Id,
        CaseTypeTitle: this.caseForm.value.CaseTypeTitle,
        Code: this.caseForm.value.Code,
        TotalPayment: this.caseForm.value.TotalPayment,
        Counter: this.caseForm.value.Counter,
        MeasurementUnit: this.caseForm.value.MeasurementUnit,     
        Remark: this.caseForm.value.Remark,
        SubsidiaryOrganizationId: this.user.SubOrgId

      }

      this.caseService.updateCaseType(caseType).subscribe({

        next: (res) => {

          this.toast = {
            message: "Case type Successfully Update",
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

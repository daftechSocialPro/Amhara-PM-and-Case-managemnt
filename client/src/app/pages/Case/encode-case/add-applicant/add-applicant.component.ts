import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {

  @Input() applicantId!:string
  applicantForm !: FormGroup
  toast!: toastPayload
  user!: UserView

  applicant :any
  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private caseService: CaseService,
    private userService: UserService,
    private commonService: CommonService,
    public  translate: TranslateService ) {

    this.applicantForm = this.formBuilder.group({

      ApplicantName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: ['w@gmail.com', Validators.required],
      CustomerIdentityNumber: ['', Validators.required],
      ApplicantType: ['', Validators.required],


    })
  }

  ngOnInit(): void {
    this.caseService.getSingleApplicant(this.applicantId).subscribe((res:any)=>{

      console.log(res)
      
            this.applicantForm.controls['ApplicantName'].setValue(res.ApplicantName)
            this.applicantForm.controls['PhoneNumber'].setValue(res.PhoneNumber)
            this.applicantForm.controls['Email'].setValue(res.Email)
            this.applicantForm.controls['CustomerIdentityNumber'].setValue(res.CustomerIdentityNumber)
            this.applicantForm.controls['ApplicantType'].setValue(res.ApplicantType==0?'Organization':'Indivisual')
          })
      

    this.user = this.userService.getCurrentUser()

  }
  submit() {
    if (this.applicantForm.valid) {

      this.caseService.createApplicant({
        ApplicantName: this.applicantForm.value.ApplicantName,
        PhoneNumber: this.applicantForm.value.PhoneNumber,
        Email: this.applicantForm.value.Email,
        CustomerIdentityNumber: this.applicantForm.value.CustomerIdentityNumber,
        ApplicantType: this.applicantForm.value.ApplicantType,
        CreatedBy: this.user.UserID,
        SubsidiaryOrganizationId: this.user.SubOrgId

      }).subscribe({
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
          this.activeModal.close(res)
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

  }

  update() {
    if (this.applicantForm.valid) {

      this.caseService.updateApplicant({
        ApplicantName: this.applicantForm.value.ApplicantName,
        PhoneNumber: this.applicantForm.value.PhoneNumber,
        Email: this.applicantForm.value.Email,
        CustomerIdentityNumber: this.applicantForm.value.CustomerIdentityNumber,
        ApplicantType: this.applicantForm.value.ApplicantType,
        ApplicantId: this.applicantId

      }).subscribe({
        next: (res) => {
          this.toast = {
            message: "case type Successfully Update",
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.activeModal.close(res)
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

  }
  closeModal() {

    this.activeModal.close()
  }



}

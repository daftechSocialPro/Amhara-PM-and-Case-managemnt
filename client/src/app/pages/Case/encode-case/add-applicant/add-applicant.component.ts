import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit {

  applicantForm !: FormGroup
  toast!: toastPayload
  user!: UserView
  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private caseService: CaseService,
    private userService: UserService,
    private commonService: CommonService) {

    this.applicantForm = this.formBuilder.group({

      ApplicantName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: ['w@gmail.com', Validators.required],
      CustomerIdentityNumber: ['', Validators.required],
      ApplicantType: ['', Validators.required],


    })
  }

  ngOnInit(): void {

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
        CreatedBy: this.user.UserID

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
  closeModal() {

    this.activeModal.close()
  }



}

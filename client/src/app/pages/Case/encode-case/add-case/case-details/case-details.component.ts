import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { NotificationService } from 'src/app/layouts/header/notification.service';
import { SelectList } from 'src/app/pages/common/common';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../../case.service';
import { AddApplicantComponent } from '../../add-applicant/add-applicant.component';
import { CaseTypeView } from '../../../case-type/casetype';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit{

  caseForm!: FormGroup;
  applicants!: SelectList[];
  outsideCases!: SelectList[];
  fileSettings!: SelectList[];
  toast!: toastPayload;
  CaseNumber!: string;
  Documents: any;
  settingsFile: fileSettingSender[] = [];
  user!: UserView;
  childCases!:CaseTypeView[];


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private modalService: NgbModal,
    private caseService: CaseService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService  // private caseService :
  ) {
    this.caseForm = this.formBuilder.group({
      LetterNumber: ['', Validators.required],
      LetterSubject: ['', Validators.required],
      CaseTypeId: ['', Validators.required],
      ApplicantId: ['', Validators.required],
      PhoneNumber2: ['', Validators.required],
      Representative: ['', Validators.required],
    });


  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getCaseNumber();
    this.getApplicants();
    this.getOutSideCases();
    
  }


 


  getCaseNumber() {
    this.caseService.getCaseNumber(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.CaseNumber = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getChildCases(caseTypeId:string){
    this.caseService.GetCaseTypeChildren(caseTypeId).subscribe({
      next: (res) => {
        this.childCases = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getOutSideCases() {
    this.caseService.getCaseTypeByCaseForm('Outside',this.user.SubOrgId).subscribe({
      next: (res) => {
        this.outsideCases = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getApplicants() {
    this.caseService.getApplicantSelectList(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.applicants = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  
  submit() {
    if (this.caseForm.valid) {

      
          const formData = new FormData();
          
    
          formData.set('CaseNumber', this.CaseNumber);
          formData.set('LetterNumber', this.caseForm.value.LetterNumber);
          formData.set('LetterSubject', this.caseForm.value.LetterSubject);
          formData.set('CaseTypeId', this.caseForm.value.CaseTypeId);
          formData.set('ApplicantId', this.caseForm.value.ApplicantId);
          formData.set('PhoneNumber2', this.caseForm.value.PhoneNumber2);
          formData.set('Representative', this.caseForm.value.Representative);
          formData.set('CreatedBy', this.user.UserID);
          formData.set('SubsidiaryOrganizationId', this.user.SubOrgId);
    
          //console.log(formData)
    
          this.caseService.addCase(formData).subscribe({
            next: (res) => {
              this.toast = {
                message: ' Case Successfully Created',
                title: 'Successfully Created.',
                type: 'success',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast);
              this.router.navigate(['/casefiles'], {
                state: {
                  response: res
                },
              });
              // this.closeModal();
            },
            error: (err) => {
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
              console.log(err);
            },
          });


       
    } else {
      
        this.toast = {
          message: "Data entered is not valid",
          title: 'Something went wrong.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);      
    }
  }

  addApplicant() {
    let modalRef = this.modalService.open(AddApplicantComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((res) => {
      console.log(res)
      this.getApplicants();
      this.caseForm.controls['ApplicantId'].setValue(res)
    });
  }

 

  closeModal() {
    this.activeModal.close();
  }

}

export interface fileSettingSender {
  FileSettingId: string;
  File: File;
}

import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../../case.service';
import { ICaseView } from '../../Icase';
import { AddApplicantComponent } from '../../add-applicant/add-applicant.component';
import { fileSettingSender } from '../../add-case/add-case.component';

@Component({
  selector: 'app-update-case-details',
  templateUrl: './update-case-details.component.html',
  styleUrls: ['./update-case-details.component.css']
})
export class UpdateCaseDetailsComponent {
  @Input() caseId!: string
  encodecase !: ICaseView
  caseForm!: FormGroup;
  applicants!: SelectList[];
  outsideCases!: SelectList[];
  fileSettings!: SelectList[];
  toast!: toastPayload;
  CaseNumber!: string;
  Documents: any;
  settingsFile: fileSettingSender[] = [];
  user!: UserView;
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private modalService: NgbModal,
    private caseService: CaseService,
    private userService: UserService, // private caseService :
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('caseId') ?? '';
    this.user = this.userService.getCurrentUser();
    this.getSingleCase()
    this.getOutSideCases();
    this.caseForm = this.formBuilder.group({
      LetterNumber: ['', Validators.required],
      LetterSubject: ['', Validators.required],
      CaseTypeId: ['', Validators.required],
      ApplicantId: ['', Validators.required],
      PhoneNumber2: ['', Validators.required],
      Representative: ['', Validators.required],
    });
    
   
  }
  getSingleCase() {
    this.caseService.GetSingleCase(this.caseId).subscribe({
      next: (res) => {
        this.encodecase = res

        console.log(res.ApplicantId?.toLowerCase())

        this.getCaseNumber();
        this.getApplicants();
        this.caseForm.controls['LetterNumber'].setValue(res.LetterNumber)
        this.caseForm.controls['LetterSubject'].setValue(res.LetterSubject)
        this.caseForm.controls['CaseTypeId'].setValue(res.CaseTypeId?.toLowerCase())

        this.caseForm.controls['PhoneNumber2'].setValue(res.ApplicantPhoneNo)
        this.caseForm.controls['Representative'].setValue(res.Representative)
        this.getFileSettings(res.CaseTypeId!)
      }, error: (err) => {
      }
    })
  }
  getFileSettings(casetTypeId: string) {
    this.caseService.getFileSettignsByCaseTypeId(casetTypeId).subscribe({
      next: (res) => {
        this.fileSettings = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getCaseNumber() {
    this.CaseNumber = this.encodecase.CaseNumber
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
       this.caseForm.controls['ApplicantId'].setValue(this.encodecase.ApplicantId?.toLowerCase())
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  addApplicant() {
    let modalRef = this.modalService.open(AddApplicantComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.result.then((res) => {
      console.log(res)
      this.getApplicants();
      this.caseForm.controls['ApplicantId'].setValue(res.toString().toLowerCase())
    });
  }

  updateApplicant() {
    let modalRef = this.modalService.open(AddApplicantComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    console.log("update",this.caseForm.value.ApplicantId)
    modalRef.componentInstance.applicantId=this.caseForm.value.ApplicantId

    modalRef.result.then((res) => {
      console.log(res)
      this.getApplicants();

    });
  }

  closeModal() {
    this.router.navigate(['encodecase']);
    this.activeModal.close();
  }
  submit() {
    if (this.caseForm.valid) {
      const formData = new FormData();
      
      formData.set('caseId',this.encodecase.Id)
      formData.set('CaseNumber', this.CaseNumber);
      formData.set('LetterNumber', this.caseForm.value.LetterNumber);
      formData.set('LetterSubject', this.caseForm.value.LetterSubject);
      formData.set('CaseTypeId', this.caseForm.value.CaseTypeId);
      formData.set('ApplicantId', this.caseForm.value.ApplicantId);
      formData.set('PhoneNumber2', this.caseForm.value.PhoneNumber2);
      formData.set('Representative', this.caseForm.value.Representative);
      formData.set('CreatedBy', this.user.UserID);
      //console.log(formData)
      this.caseService.updateCase(formData).subscribe({
        next: (res) => {
          this.toast = {
            message: ' Case Successfully Updated',
            title: 'Successfully Updated.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.router.navigate(['/updatecasefiles'], {
            state: {
              response: this.caseId
            },
          });
          //this.closeModal();
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
    }
  }

}

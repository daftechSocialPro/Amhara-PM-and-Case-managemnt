import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { AddApplicantComponent } from '../add-applicant/add-applicant.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from 'src/app/layouts/header/notification.service';

declare var Dynamsoft: any;


@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css'],
})
export class AddCaseComponent implements OnInit {

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
    private userService: UserService,
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


  onImagesScannedUpdate(images: any) {
    
    
    const fileArray = [];
    for (let i = 0; i < images.length; i++) {

      let Filee = this.getFile(images[i])
      fileArray.push(Filee);

    }
 
    this.Documents = this.createFileList(fileArray);
  }


  getCaseNumber() {
    this.caseService.getCaseNumber().subscribe({
      next: (res) => {
        this.CaseNumber = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getOutSideCases() {
    this.caseService.getCaseTypeByCaseForm('Outside').subscribe({
      next: (res) => {
        this.outsideCases = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getApplicants() {
    this.caseService.getApplicantSelectList().subscribe({
      next: (res) => {
        this.applicants = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
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
  submit() {
    if (this.caseForm.valid) {

      if (!this.Documents){

      let modalRef = this.modalService.open(ConfirmationDialogComponent)
      modalRef.componentInstance.title = "Confirmation"
      modalRef.componentInstance.message ="Are you sure you want to continue with out documents?"
      modalRef.componentInstance.btnCancelText = "Cancel"
      modalRef.componentInstance.btnOkText = "Confirm"

      modalRef.result.then((res)=>{
        if(res){
          const formData = new FormData();
          if (this.Documents) {
            for (let file of this.Documents) {
              formData.append('attachments', file);
            }
          }
    
          for (let file of this.settingsFile) {
            formData.append(
              'fileSettings',
              file.File,
              `${file.FileSettingId}.${file.File.name.split('.').reverse()[0]}`
            );
          }
    
          formData.set('CaseNumber', this.CaseNumber);
          formData.set('LetterNumber', this.caseForm.value.LetterNumber);
          formData.set('LetterSubject', this.caseForm.value.LetterSubject);
          formData.set('CaseTypeId', this.caseForm.value.CaseTypeId);
          formData.set('ApplicantId', this.caseForm.value.ApplicantId);
          formData.set('PhoneNumber2', this.caseForm.value.PhoneNumber2);
          formData.set('Representative', this.caseForm.value.Representative);
          formData.set('CreatedBy', this.user.UserID);
    
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
          
              this.closeModal();
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


        }
      })
      }
      else {
      const formData = new FormData();
      if (this.Documents) {
        for (let file of this.Documents) {
          formData.append('attachments', file);
        }
      }

      for (let file of this.settingsFile) {
        formData.append(
          'fileSettings',
          file.File,
          `${file.FileSettingId}.${file.File.name.split('.').reverse()[0]}`
        );
      }

      formData.set('CaseNumber', this.CaseNumber);
      formData.set('LetterNumber', this.caseForm.value.LetterNumber);
      formData.set('LetterSubject', this.caseForm.value.LetterSubject);
      formData.set('CaseTypeId', this.caseForm.value.CaseTypeId);
      formData.set('ApplicantId', this.caseForm.value.ApplicantId);
      formData.set('PhoneNumber2', this.caseForm.value.PhoneNumber2);
      formData.set('Representative', this.caseForm.value.Representative);
      formData.set('CreatedBy', this.user.UserID);

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
          this.closeModal();
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
      }
    } else {
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

  onFileSelected(event: any) {
    this.Documents = event.target.files;
    console.log(this.Documents)

  }
  createFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
      dataTransfer.items.add(files[i]);
    }
    return dataTransfer.files;
  }
  onFileSettongSelected(filesettingId: string, event: any) {
    var settingFile: fileSettingSender = {
      FileSettingId: filesettingId,
      File: event.target.files[0],
    };

    if (
      this.settingsFile.filter((x) => x.FileSettingId === filesettingId)
        .length > 0
    ) {
      const indexfile = this.settingsFile.findIndex(
        (f) => f.FileSettingId === filesettingId
      );

      this.settingsFile.splice(indexfile, 1);
      this.settingsFile.push(settingFile);
    } else {
      this.settingsFile.push(settingFile);
    }
  }

  closeModal() {
    this.activeModal.close();
  }
  getFile(imageData: any) {

    const byteString = atob(imageData.src.split(',')[1]);
    const mimeString = imageData.mimeType;
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeString });
    const fileName = this.getFileName() + ".jpg"
    const file = new File([blob], fileName, { type: mimeString });
    return file
  }

  getFileName() {
    const length: number = 10;
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }
}

export interface fileSettingSender {
  FileSettingId: string;
  File: File;
}

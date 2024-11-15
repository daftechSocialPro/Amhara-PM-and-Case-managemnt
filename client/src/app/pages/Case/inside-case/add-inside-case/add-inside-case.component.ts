import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from 'src/app/layouts/header/notification.service';
import { SelectList } from 'src/app/pages/common/common';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { AddApplicantComponent } from '../../encode-case/add-applicant/add-applicant.component';
import { fileSettingSender } from '../../encode-case/add-case/add-case.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-inside-case',
  templateUrl: './add-inside-case.component.html',
  styleUrls: ['./add-inside-case.component.css']
})
export class AddInsideCaseComponent implements OnInit {

  caseForm!: FormGroup;
  applicants!: SelectList[];
  InsideCases!: SelectList[];
  fileSettings!: SelectList[];
  childCases !: SelectList[]
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
    private notificationService: NotificationService,
    public translate: TranslateService  // private caseService :
  ) {
    this.caseForm = this.formBuilder.group({
      LetterNumber: [''],
      LetterSubject: ['', Validators.required],
      CaseTypeId: ['', Validators.required],
      EmployeeId: ['', Validators.required],
      PhoneNumber2: ['', Validators.required],
      Representative: ['', Validators.required],
    });


  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getCaseNumber();

    this.getInsideCases();
    this.caseForm.controls['EmployeeId'].setValue(this.user.EmployeeId)
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
    this.caseService.getCaseNumber(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.CaseNumber = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getInsideCases() {
    this.caseService.getCaseTypeByCaseForm('Inside', this.user.SubOrgId).subscribe({
      next: (res) => {
        this.InsideCases = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  getFiles(casetTypeId: string) {

    this.getChildCases(casetTypeId),
      this.getFileSettings(casetTypeId)

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
  getChildCases(casetTypeId: string) {
    this.caseService.getChildCasesByCaseTypeId(casetTypeId).subscribe({
      next: (res) => {
        this.childCases = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }



  submit() {
    if (this.caseForm.valid) {
      console.log("this.caseForm", this.caseForm)
      if (!this.Documents) {

        let modalRef = this.modalService.open(ConfirmationDialogComponent)
        modalRef.componentInstance.title = "Confirmation"
        modalRef.componentInstance.message = "Are you sure you want to continue with out documents?"
        modalRef.componentInstance.btnCancelText = "Cancel"
        modalRef.componentInstance.btnOkText = "Confirm"

        modalRef.result.then((res) => {
          if (res) {
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
            formData.set('EmployeeId', this.user.EmployeeId);
            formData.set('PhoneNumber2', this.caseForm.value.PhoneNumber2);
            formData.set('Representative', this.caseForm.value.Representative);
            formData.set('SubsidiaryOrganizationId', this.user.SubOrgId);
            formData.set('CreatedBy', this.user.UserID);







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
        formData.set('EmployeeId', this.user.EmployeeId);
        formData.set('PhoneNumber2', this.caseForm.value.PhoneNumber2);
        formData.set('Representative', this.caseForm.value.Representative);
        formData.set('CreatedBy', this.user.UserID);
        formData.set('SubsidiaryOrganizationId', this.user.SubOrgId);


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

          },
        });
      }
    } else {
    }
  }



  onFileSelected(event: any) {
    this.Documents = event.target.files;


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


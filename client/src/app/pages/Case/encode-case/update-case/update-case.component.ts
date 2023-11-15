import { Component, Input, OnInit } from '@angular/core';
import { ICaseView } from '../Icase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { UserView } from 'src/app/pages/pages-login/user';
import { fileSettingSender } from '../add-case/add-case.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { IndividualConfig } from 'ngx-toastr';
import { AddApplicantComponent } from '../add-applicant/add-applicant.component';

@Component({
  selector: 'app-update-case',
  templateUrl: './update-case.component.html',
  styleUrls: ['./update-case.component.css']
})
export class UpdateCaseComponent implements OnInit {

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
    private userService: UserService // private caseService :
  ) {

  }

  ngOnInit(): void {

    
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

        this.getCaseNumber();
        this.getApplicants();
        this.caseForm.controls['LetterNumber'].setValue(res.LetterNumber)
        this.caseForm.controls['LetterSubject'].setValue(res.LetterSubject)
        this.caseForm.controls['CaseTypeId'].setValue(res.CaseTypeId?.toLocaleLowerCase())
        this.caseForm.controls['ApplicantId'].setValue(res.ApplicantId?.toLocaleLowerCase())
        this.caseForm.controls['PhoneNumber2'].setValue(res.ApplicantPhoneNo)
        this.caseForm.controls['Representative'].setValue(res.Representative)
        this.getFileSettings(res.CaseTypeId!)
      }, error: (err) => {

      }
    })
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

    this.CaseNumber = this.encodecase.CaseNumber

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

  viewFile(file: string) {


    return this.commonService.createImgPath(file)


  }
  RemoveFile(attachmentId: string) {

    this.caseService.RemoveAttachment(attachmentId).subscribe({
      next:(res)=>{
        this.getSingleCase()
      }
    })
    

  }

}

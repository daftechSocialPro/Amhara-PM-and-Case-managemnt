import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { ICaseState } from './IcaseState';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfer-case',
  templateUrl: './transfer-case.component.html',
  styleUrls: ['./transfer-case.component.css']
})
export class TransferCaseComponent implements OnInit {
  @Input() historyId!: string
  @Input() CaseTypeName!: string
  @Input() CaseTypeId !: string
  @Input() CaseId !: string
  user!: UserView
  transferForm!: FormGroup
  toast !: toastPayload
  Branches !: SelectList[]
  Structures !: SelectList[]
  Employees !: SelectList[]
  Documents: any

  qrData!:string
  caseState !: ICaseState
  mobileUplodedFiles:any[] = []
  public connection!: signalR.HubConnection;
  urlHub : string = environment.assetUrl+"/ws/Encoder"

  constructor(
    private activeModal: NgbActiveModal,
    private route: Router,
    private userService: UserService,
    private caseService: CaseService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private organizationService: OrganizationService) {

    this.transferForm = this.formBuilder.group({
      ToEmployeeId: [''],
      ToStructureId: ['', Validators.required],
      Remark: ['']
    })

  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    console.log("historyid",this.historyId)
    console.log("caseid",this.CaseId)
    this.getBranches()
    this.getCaseState()
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl(this.urlHub, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Debug)
    .build();


  this.connection.start()
    .then((res) => {
      console.log("employeeId",this.user.EmployeeId)
     this.connection.invoke('addDirectorToGroup', this.user.EmployeeId);
      console.log('Connection started.......!');
    })
    .catch((err) => console.log('Error while connecting to the server', err));
    if(this.connection){
      this.connection.on('getUplodedFiles', (result) => {
        this.mobileUplodedFiles = result
        console.log("UPLODED FILES",this.mobileUplodedFiles)
       });
    }

    this.qrData = `${this.CaseId}_${this.user.EmployeeId}_CASE`
  }

  getCaseState() {

    this.caseService.GetCaseState(this.CaseTypeId, this.historyId).subscribe({
      next: (res) => {
        this.caseState = res
        console.log('this.caseState: ', this.caseState);

      }
      , error: (err) => {
        console.error(err)
      }
    })
  }

  getBranches() {
    this.organizationService.getOrgBranchSelectList(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.Branches = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  getStructures(branchId: string) {

    this.organizationService.getOrgStructureSelectList(branchId).subscribe({
      next: (res) => {
        this.Structures = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  getEmployees(structureId: string) {

    this.organizationService.getEmployeesBystructureId(structureId).subscribe({
      next: (res) => {
        this.Employees = res
      }, error: (err) => {
        console.error(err)
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

  createFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
      dataTransfer.items.add(files[i]);
    }
    return dataTransfer.files;
  }

  submit() {

    if (this.transferForm.valid) {


      const formData = new FormData();

      if (this.Documents){

      for (let file of this.Documents) {
        formData.append('attachments', file);
      }
    }

      formData.set('CaseHistoryId', this.historyId)
      //formData.set('CaseTypeId',this)
      formData.set('FromEmployeeId', this.user.EmployeeId)
      formData.set('userId', this.user.UserID)
      formData.set('Remark', this.transferForm.value.Remark)
      formData.set('ToEmployeeId', this.transferForm.value.ToEmployeeId)
      formData.set('ToStructureId', this.transferForm.value.ToStructureId)
      formData.set('CaseId', this.CaseId)

      this.caseService.TransferCase(formData).subscribe({
        next: (res) => {
          this.toast = {
            message: 'Case Transfred Successfully!!',
            title: 'Successfull.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.route.navigate(['mycaselist'])
          this.closeModal()

        }, error: (err) => {

          this.toast = {
            message: 'Something went wrong!!',
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

  onFileSelected(event: any) {
    this.Documents = (event.target).files;

  }



  viewFile(file: string) {
    return this.commonService.createImgPath(file)
  }
}

export interface fileSettingSender {
  FileSettingId: string;
  File: File;
}
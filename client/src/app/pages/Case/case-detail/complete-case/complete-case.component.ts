import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-complete-case',
  templateUrl: './complete-case.component.html',
  styleUrls: ['./complete-case.component.css']
})
export class CompleteCaseComponent implements OnInit {

  @Input() CaseId !: string
  @Input() historyId!:string
  user! : UserView
  completeForm!: FormGroup
  toast !:toastPayload 
  Documents: any

  qrData!:string

  mobileUplodedFiles:any[] = []
  public connection!: signalR.HubConnection;
  urlHub : string = environment.assetUrl+"/ws/Encoder"
  constructor(
    private activeModal: NgbActiveModal,
    private route : Router,
    private userService : UserService,
    private caseService: CaseService,
    private formBuilder: FormBuilder,
    private commonService : CommonService,
    public  translate: TranslateService) {

    this.completeForm = this.formBuilder.group({
      Remark: ['']
    })

  }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    console.log("caseid",this.CaseId)
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

    const formData = new FormData();

      if (this.Documents){

      for (let file of this.Documents) {
        formData.append('attachments', file);
      }
    }

    formData.set('CaseHistoryId', this.historyId)
    formData.set('EmployeeId', this.user.EmployeeId)
    formData.set('Remark', this.completeForm.value.Remark)
    formData.set('userId', this.user.UserID)

    this.caseService.CompleteCase(formData).subscribe({
      next:(res)=>{
        this.toast = {
          message: 'Case Completed Successfully!!',
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

      },error:(err)=>{

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

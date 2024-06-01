import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSettingView } from '../case-type/casetype';
import { CaseService } from '../case.service';

import { AddFileSettingComponent } from './add-file-setting/add-file-setting.component';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-file-setting',
  templateUrl: './file-setting.component.html',
  styleUrls: ['./file-setting.component.css']
})
export class FileSettingComponent implements OnInit {

  user!:UserView
  fileSettings!: FileSettingView[]

  constructor(private modalService: NgbModal, 
    private caseService: CaseService, 
    private userService: UserService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    public translate: TranslateService
    ) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getFileSettingList()
  }

  getFileSettingList() {

    this.caseService.getFileSetting(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.fileSettings = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  addfilesetting() {
    let modalRef = this.modalService.open(AddFileSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(()=>
    this.getFileSettingList())
  }

  UpdateFileSetting(file: FileSettingView) {
    let modalRef = this.modalService.open(AddFileSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.file = file
    modalRef.result.then(()=>
    this.getFileSettingList())
  }

  DeleteFileSetting(fileId : string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this File Setting?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.caseService.deleteFileSetting(fileId).subscribe({
          next: (res) => {

              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Case Type successfully Deleted' });
              this.getFileSettingList()

          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });

          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
  }

}

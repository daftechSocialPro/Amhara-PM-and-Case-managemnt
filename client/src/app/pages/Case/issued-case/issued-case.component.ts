import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';

import { RaiseIssueComponent } from '../encode-case/raise-issue/raise-issue.component';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-issued-case',
  templateUrl: './issued-case.component.html',
  styleUrls: ['./issued-case.component.css']
})
export class IssuedCaseComponent implements OnInit {

  issuedCases!: ICaseView[]
  user!: UserView
  toast! : toastPayload
  constructor(
    private modalService: NgbModal,
     private caseService: CaseService,
      private userService: UserService,
      private commonService : CommonService,
      private confirmationDialogService : ConfirmationDialogService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getEnocdedCases()
  }

  getEnocdedCases() {
    this.caseService.getAllIssue(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.issuedCases = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }


  raiseIssue(){
    let modalRef =  this.modalService.open(RaiseIssueComponent,{size:'xl',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getEnocdedCases()
    })
  }

  takeActionIssueCase(caseId : string , action : string){

    this.confirmationDialogService
    .confirm(
      'Please confirm..',
      'Do you really want to '+action +' Case Issue ?'
    )  .then((confirmed) => {
      if (confirmed) {
     
        
        this.caseService.takeActionIssueCase(
          {
            'issueCaseId' : caseId,
            'action':action
          }
        ).subscribe({
          next:(res)=>{
            this.toast = {
              message: ' Case Issued Successfully',
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.getEnocdedCases()
          
          },error:(err)=>{
        
            this.toast = {
              message: 'Something went wrong ',
              title: 'Network Error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            console.error(err)
          }
        
        })
      }
    })



  }
}

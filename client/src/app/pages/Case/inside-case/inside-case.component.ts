import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddInsideCaseComponent } from './add-inside-case/add-inside-case.component';
import { ICaseView } from '../encode-case/Icase';
import { CaseService } from '../case.service';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-inside-case',
  templateUrl: './inside-case.component.html',
  styleUrls: ['./inside-case.component.css']
})
export class InsideCaseComponent implements OnInit {
  myacaselist!: ICaseView[]
  user!: UserView
  toast ! : toastPayload
  constructor (
    private modalService : NgbModal,
    private caseService: CaseService,
    private userService : UserService,
    private commonService : CommonService,
    private confirmationDialogService:ConfirmationDialogService, 
    private route : Router ){

  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()    
    this.getMyCaseList()
  }

  getMyCaseList() {
    this.caseService.getMyCaseList(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.myacaselist = res
        console.log(res)
      }, error: (err) => {
        console.error(err)
      }
    })
  }



  addCase() {
    let modalRef = this.modalService.open(AddInsideCaseComponent, { size: 'xl', backdrop: 'static' })
    modalRef.result.then(()=>{
      this.getMyCaseList()
    })
  }

  detailCase(caseHistoryId: string) {
    this.route.navigate(['caseHistory',{caseHistoryId:caseHistoryId}])
  }
  confirmTransaction(caseHistoryId: string) {

    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Confirm Case ?')
    .then((confirmed) => {
      if (confirmed){
      this.caseService.ConfirmTransaction({
      EmployeeId: this.user.EmployeeId,
      CaseHistoryId: caseHistoryId
    }).subscribe({
      next: (res) => {

        this.toast = {
          message: "Case Confirmed Successfully!!",
          title: 'Successfully Created.',
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
        this.getMyCaseList()
    

      }, error: (err) => {
        this.toast = {
          message: "Something went wrong!!",
          title: 'Network Error.',
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

    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  


  }
}

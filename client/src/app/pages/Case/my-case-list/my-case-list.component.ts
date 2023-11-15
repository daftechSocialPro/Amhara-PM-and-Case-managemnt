import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';

@Component({
  selector: 'app-my-case-list',
  templateUrl: './my-case-list.component.html',
  styleUrls: ['./my-case-list.component.css']
})
export class MyCaseListComponent implements OnInit {

  myacaselist!: ICaseView[]
  user!: UserView
  toast !: toastPayload 

  constructor(

    private route: Router,
    private confirmationDialogService:ConfirmationDialogService, 
    private caseService: CaseService, 
    private userService: UserService,
    private commonService: CommonService) { }
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
        console.log(err)
      }
    
    })
      }

    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  












    


  }

}
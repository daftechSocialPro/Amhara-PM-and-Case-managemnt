import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';

@Component({
  selector: 'app-complete-case',
  templateUrl: './complete-case.component.html',
  styleUrls: ['./complete-case.component.css']
})
export class CompleteCaseComponent implements OnInit {

  
  @Input() historyId!:string
  user! : UserView
  completeForm!: FormGroup
  toast !:toastPayload 
  constructor(
    private activeModal: NgbActiveModal,
    private route : Router,
    private userService : UserService,
    private caseService: CaseService,
    private formBuilder: FormBuilder,
    private commonService : CommonService) {

    this.completeForm = this.formBuilder.group({
      Remark: ['']
    })

  }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

  }

  submit() {

    this.caseService.CompleteCase({
      CaseHistoryId: this.historyId,
      EmployeeId: this.user.EmployeeId,
      Remark: this.completeForm.value.Remark
    }).subscribe({
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



}

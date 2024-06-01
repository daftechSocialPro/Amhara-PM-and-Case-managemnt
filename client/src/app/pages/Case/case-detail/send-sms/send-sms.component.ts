import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { SelectList } from 'src/app/pages/common/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {

  @Input() historyId!:string
  user! : UserView
  smsForm!: FormGroup
  toast !:toastPayload 
  smsTemplateSelectList! : SelectList[]
  constructor(
    private activeModal: NgbActiveModal,
    private userService : UserService,
    private caseService: CaseService,
    private formBuilder: FormBuilder,
    private commonService : CommonService,
    private orgService: OrganizationService,
    public  translate: TranslateService) {

    this.smsForm = this.formBuilder.group({
      SmsTemplate:[null, Validators.required],
      Remark: ['']
    })

  }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.getSmsTemplateSelectList()

  }

  getSmsTemplateSelectList(){

    this.orgService.getSmsTemplateSelectList(this.user.SubOrgId).subscribe({
      next : (res) => {
        this.smsTemplateSelectList = res
      }
    })
  }
  submit() {

    this.caseService.SendSms({
      CaseHistoryId: this.historyId,
      EmployeeId: this.user.UserID,
      Remark: this.smsForm.value.Remark,
      SmsTemplateContent: this.smsForm.value.SmsTemplate
    }).subscribe({
      next:(res)=>{
        this.toast = {
          message: 'Sms Sent Successfully!!',
          title: 'Successfull.',
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
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

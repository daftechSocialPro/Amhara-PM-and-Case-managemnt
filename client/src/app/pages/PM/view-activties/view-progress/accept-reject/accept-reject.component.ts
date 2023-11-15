import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../../pm.services';
import { ApprovalProgressDto } from '../../activityview'
@Component({
  selector: 'app-accept-reject',
  templateUrl: './accept-reject.component.html',
  styleUrls: ['./accept-reject.component.css']
})
export class AcceptRejectComponent implements OnInit {
  @Input() progressId!: string
  @Input() userType!: string
  @Input() actiontype!: string
  acceptForm !: FormGroup
  user!:UserView
  toast!:toastPayload

  ngOnInit(): void {
this.user=this.userService.getCurrentUser()
  }
  constructor(
    private formBuilder: FormBuilder, 
    private activeModal: NgbActiveModal,
    private pmService:PMService ,
    private userService:UserService,
    private commonService :CommonService) {

    this.acceptForm = this.formBuilder.group({

      Remark: ['']

    })
  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.acceptForm.valid) {
      console.log('value', this.acceptForm.value);

      let approvalProgressDto: ApprovalProgressDto = {
        progressId: this.progressId,
        actiontype: this.actiontype,
        userType: this.userType,
        Remark: this.acceptForm.value.Remark,
        createdBy:this.user.UserID
      }

this.pmService.approveProgress(approvalProgressDto).subscribe({

  next:(res)=>{
    
    this.toast = {
      message: 'Progress Approval Successfully Created',
      title: 'Successfully Created.',
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
      message: 'Something went wrong',
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
  }


}

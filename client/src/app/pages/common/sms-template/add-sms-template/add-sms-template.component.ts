import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { OrganizationService } from '../../organization/organization.service';
import { SmsTemplateGetDto, SmsTemplatePostDto } from '../sms-template';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-sms-template',
  templateUrl: './add-sms-template.component.html',
  styleUrls: ['./add-sms-template.component.css']
})
export class AddSmsTemplateComponent implements OnInit{

  @Input() template!: SmsTemplateGetDto 
  toast !: toastPayload;
  templateForm!: FormGroup
  user!: UserView
  
constructor(
  private formBuilder: FormBuilder, 
  private orgService: OrganizationService, 
  private commonService: CommonService, 
  private activeModal: NgbActiveModal,
  private userService:UserService,
  public translate: TranslateService
){}

ngOnInit(): void {
  this.user = this.userService.getCurrentUser()
  this.templateForm = this.formBuilder.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    Remark: ['']
  });

  if(this.template){
    this.templateForm.controls["Title"].setValue(this.template.Title)
    this.templateForm.controls["Description"].setValue(this.template.Description)
    this.templateForm.controls["Remark"].setValue(this.template.Remark)
  }
}




submit() {

  if (this.templateForm.valid) {

    if(this.template){
      const template : SmsTemplateGetDto ={
        Title : this.templateForm.value.Title,
        Description : this.templateForm.value.Description,
        Remark : this.templateForm.value.Remark,
        CreatedBy : this.template.CreatedBy,
        CreatedAt : this.template.CreatedAt,
        Id : this.template.Id
      }
      this.orgService.updateSmsTemplate(template).subscribe({
        next: (res) => {
  
          if (res.Success) {
            this.toast = {
              message: res.Message,
              title: 'Successfully Updated.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
    
            this.commonService.showToast(this.toast);
            this.closeModal();
            this.templateForm.reset()
  
          }
          else{
            this.toast = {
              message: res.Message,
              title: 'Something went Wrong',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
          }
  
        }, error: (err) => {
          this.toast = {
            message: err,
            title: 'Network error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
  
  
        }
      }
      );

    }
    else{

      const template : SmsTemplatePostDto ={
        Title : this.templateForm.value.Title,
        Description : this.templateForm.value.Description,
        Remark : this.templateForm.value.Remark,
        CreatedBy : this.user.UserID,
        SubsidiaryOrganizationId : this.user.SubOrgId
      }
      this.orgService.createSmsTemplate(template).subscribe({
  
        next: (res) => {
  
          if (res.Success) {
            console.log("result", res)
            this.toast = {
              message: res.Message,
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
    
            this.commonService.showToast(this.toast);
            this.closeModal();
            this.templateForm.reset()
  
          }
          else{
            this.toast = {
              message: res.Message,
              title: 'Something went Wrong',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
          }
  
        }, error: (err) => {
          console.log("Error", err)
          this.toast = {
            message: err,
            title: 'Network error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
  
  
        }
      }
      );
    }
    
  }
  else{
    this.toast = {
      message: "Please fill required inputs!!'",
      title: 'Form Submit failed.',
      type: 'error',
      ic: {
        timeOut: 2500,
        closeButton: true,
      } as IndividualConfig,
    };
    this.commonService.showToast(this.toast);
  }


}


  closeModal() {

    this.activeModal.close()
  }


}

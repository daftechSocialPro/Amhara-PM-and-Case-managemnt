import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { OrganizationService } from '../../organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { IndividualConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-sub-org',
  templateUrl: './add-sub-org.component.html',
  styleUrls: ['./add-sub-org.component.css']
})
export class AddSubOrgComponent implements OnInit {
  @Input() subOrg!:any

  toast !: toastPayload;
  subOrgForm !: FormGroup;

  
  user!: UserView

  constructor(
    private formBuilder: FormBuilder, 
    private orgService: OrganizationService, 
    private commonService: CommonService, 
    private activeModal: NgbActiveModal, 
    private userService: UserService,
    public translate: TranslateService
  ){}

  ngOnInit(): void {
      if(this.subOrg){
        console.log("this.subOrg",this.subOrg)
        this.subOrgForm = this.formBuilder.group({
          OrganizationNameEnglish:[this.subOrg.OrganizationNameEnglish,Validators.required],
          OrganizationNameInLocalLanguage: [this.subOrg.OrganizationNameInLocalLanguage,Validators.required],
          Address: [this.subOrg.Address,Validators.required],
          isRegulatoryBody: [this.subOrg.isRegulatoryBody , Validators.required],
          PhoneNumber:[this.subOrg.PhoneNumber,Validators.required],
          SmsCode: [this.subOrg.SmsCode, Validators.required],
          Remark: [this.subOrg.Remark]
        })

      }
      else{
        this.subOrgForm = this.formBuilder.group({
          OrganizationNameEnglish:['',Validators.required],
          OrganizationNameInLocalLanguage: ['',Validators.required],
          Address: ['',Validators.required],
          isRegulatoryBody: [false , Validators.required],
          PhoneNumber:['',Validators.required],
          SmsCode: ['', Validators.required],
          Remark: ['']
        })
      }
  }

  Update(){
    if(this.subOrgForm.valid){
      const subOrgData = {
        Id:this.subOrg.Id,
        OrganizationNameEnglish:this.subOrgForm.value.OrganizationNameEnglish,
        OrganizationNameInLocalLanguage:this.subOrgForm.value.OrganizationNameInLocalLanguage,
        Address:this.subOrgForm.value.Address,
        isRegulatoryBody:this.subOrgForm.value.isRegulatoryBody,
        PhoneNumber:this.subOrgForm.value.PhoneNumber,
        SmsCode:this.subOrgForm.value.SmsCode,
        Remark:this.subOrgForm.value.Remark,

      }
      this.orgService.updateSubOrg(subOrgData).subscribe({

        next: (res) => {
          this.toast = {
            message: 'Subsidiary Organization Successfully Updated',
            title: 'Successfully Updated.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          this.closeModal();
          this.subOrgForm.reset();
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
  }
  submit() {

    if (this.subOrgForm.valid) {
      this.orgService.CreateSubOrg(this.subOrgForm.value).subscribe({

        next: (res) => {
          this.toast = {
            message: 'Subsidiary Organization Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          this.closeModal();
          this.subOrgForm.reset();
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

  }

  closeModal() {
    this.activeModal.close()
  }

}
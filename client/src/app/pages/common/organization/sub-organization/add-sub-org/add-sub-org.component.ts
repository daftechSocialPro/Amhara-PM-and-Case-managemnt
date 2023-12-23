import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { OrganizationService } from '../../organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-add-sub-org',
  templateUrl: './add-sub-org.component.html',
  styleUrls: ['./add-sub-org.component.css']
})
export class AddSubOrgComponent implements OnInit {

  toast !: toastPayload;
  subOrgForm !: FormGroup;

  
  user!: UserView

  constructor(
    private formBuilder: FormBuilder, 
    private orgService: OrganizationService, 
    private commonService: CommonService, 
    private activeModal: NgbActiveModal, 
    private userService: UserService
  ){
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

  ngOnInit(): void {
      
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
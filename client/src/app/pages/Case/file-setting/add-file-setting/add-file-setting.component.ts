import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';

@Component({
  selector: 'app-add-file-setting',
  templateUrl: './add-file-setting.component.html',
  styleUrls: ['./add-file-setting.component.css']
})
export class AddFileSettingComponent {
  caseTypes!: SelectList[]
  settingForm !: FormGroup;
  userView!: UserView;
  toast!: toastPayload

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private caseService: CaseService,
    private userService: UserService,
    private commonService : CommonService) {

    this.settingForm = this.formBuilder.group({
      CaseTypeId: ['', Validators.required],
      FileName: ['', Validators.required],
      FileType: ['', Validators.required],


    })



  }
  ngOnInit(): void {

    this.userView = this.userService.getCurrentUser()

    this.getCaseTypeList()

  }
  getCaseTypeList() {

    this.caseService.getSelectCasetType().subscribe({
      next: (res) => {
        this.caseTypes = res;
        console.log("casetypes", res)
      }
    })

  }
  submit(
  ) {

    if (this.settingForm.valid) {

      this.caseService.createFileSetting({

        CaseTypeId: this.settingForm.value.CaseTypeId,
        Name: this.settingForm.value.FileName,
        FileType: this.settingForm.value.FileType,
        CreatedBy: this.userView.UserID
      }).subscribe({
        next: (res) => {
          this.toast = {
            message: "File Setting Successfully Creted",
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal()
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
         console.error(err)
        }
      })
    }

  }
  closeModal() {

    this.activeModal.close()
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from '../../../common';
import { OrganizationService } from '../../organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.css']
})
export class AddStructureComponent implements OnInit {

  toast !: toastPayload;
  structureForm !: FormGroup;

  branchList: SelectList[] = []
  parentStructureList: SelectList[] = []
  user!: UserView

  constructor(
    private formBuilder: FormBuilder, 
    private orgService: OrganizationService, 
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    public translate: TranslateService,
    private userService:UserService
  ) {

    this.structureForm = this.formBuilder.group({
      OrganizationBranchId: ['', Validators.required],
      IsBranch: [false, Validators.required],
      OfficeNumber: [""],
      ParentStructureId: [null, Validators.required],
      StructureName: ['', Validators.required],
      Order: ['', Validators.required],
      Weight: ['', [Validators.required, Validators.min(1)]],
      Remark: ['']
    })
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.orgService.getOrgBranchSelectList(this.user.SubOrgId).subscribe(
      {
        next: (res) => {
          this.branchList = res
          console.log('this.branchList: ', this.branchList);
        },

        error: (err) => console.error(err)
      })


  }

  onBranchChange() {

    this.orgService.getOrgStructureSelectList(this.structureForm.value.OrganizationBranchId).subscribe(
      {
        next: (res) => this.parentStructureList = res,
        error: (err) => console.error(err)
      }
    )
  }

  submit() {

    if (this.structureForm.valid) {
      this.structureForm.addControl('SubsidiaryOrganizationId', this.formBuilder.control(this.user.SubOrgId));
      this.orgService.OrgStructureCreate(this.structureForm.value).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Organizational Structure Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          this.closeModal();
          this.structureForm = this.formBuilder.group({
            IsBranch: [''],
            ParentStructureId: [''],
            StructureName: [''],
            Order: [''],
            Weight: [''],
            Remark: ['']
          })

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

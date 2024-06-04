import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { SelectList } from '../../../common';
import { OrganizationService } from '../../organization.service';
import { OrganizationalStructure } from '../org-structure';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-structure',
  templateUrl: './update-structure.component.html',
  styleUrls: ['./update-structure.component.css']
})
export class UpdateStructureComponent {

  @Input() structure  !: OrganizationalStructure;

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
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    console.log('this.structure: ', this.structure);
    this.getBranchList()
    this.structureForm = this.formBuilder.group({
      OrganizationBranchId: ["", Validators.required],
      IsBranch: [this.structure?.IsBranch, Validators.required],
      OfficeNumber: [""],
      ParentStructureId: ["", Validators.required],
      StructureName: [this.structure?.StructureName, Validators.required],
      Order: [this.structure?.Order, Validators.required],
      Weight: [this.structure?.Weight, [Validators.required, Validators.min(1)]],
      RowStatus: [this.structure.RowStatus, Validators.required],
      Remark: [this.structure.Remark]
    })
  }

  getBranchList() {
    this.orgService.getOrgBranchSelectList(this.user.SubOrgId).subscribe(
      {
        next: (res) => {
          this.branchList = res
          const branch = this.branchList.find(x => x.Id == this.structure?.OrganizationBranchId)
          // console.log('branch: ', branch);
          this.structureForm.controls["OrganizationBranchId"].setValue(branch?.Id)
          this.onBranchChange()
        },
        error: (err) => console.error(err)
      })
  }
  onBranchChange() {

    this.orgService.getOrgStructureSelectList(this.structure.OrganizationBranchId).subscribe(
      {
        next: (res) => {
          this.parentStructureList = res.filter(x => x.Id !== this.structure.Id)
          console.log('this.parentStructureList: ', this.parentStructureList);
          // console.log('this.parentStructureList: ', this.parentStructureList);
          const parent = this.parentStructureList.find(x => x.Id == this.structure?.ParentStructureId)
          this.structureForm.controls["ParentStructureId"].setValue(parent?.Id)
        },
        error: (err) => console.error(err)

      }

    )

  }

  updateStructure() {

    this.confirmationService.confirm({
      message: `Are You Sure You Want To Update This Structure?<br>
                Structure Name: ${this.structureForm.value.StructureName}<br>`,
      header: 'Update Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.submit()
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
  }

  consoleLog() {
    console.log('this.structureForm.value.ParentStructureId: ', this.structureForm.value.ParentStructureId);
  }
  submit() {

    if (this.structureForm.valid) {

      let orgStruct: OrganizationalStructure = {
        Id: this.structure.Id,
        OrganizationBranchId: this.structureForm.value.OrganizationBranchId,
        ParentStructureId: this.structureForm.value.ParentStructureId,
        StructureName: this.structureForm.value.StructureName,
        Order: this.structureForm.value.Order,
        Weight: this.structureForm.value.Weight,
        RowStatus: this.structureForm.value.RowStatus,
        Remark: this.structureForm.value.Remark,
        IsBranch: this.structureForm.value.IsBranch,
        OfficeNumber: this.structureForm.value.OfficeNumber,
        BranchName: '',
        ParentStructureName: '',
        SubsidiaryOrganizationId: this.user.SubOrgId
      }


      this.orgService.orgStructureUpdate(orgStruct).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Organizational Structure Successfully Updated',
            title: 'Successfully Update.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          this.closeModal();
          this.structureForm = this.formBuilder.group({
            OrganizationBranchId: [''],
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

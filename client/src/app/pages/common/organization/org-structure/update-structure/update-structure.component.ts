import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { SelectList } from '../../../common';
import { OrganizationService } from '../../organization.service';
import { OrganizationalStructure } from '../org-structure';

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

  constructor(private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService, private activeModal: NgbActiveModal) {

 
  }

  ngOnInit(): void {

    this.orgService.getOrgBranchSelectList().subscribe(
      {
        next: (res) => this.branchList = res,
        error: (err) => console.error(err)
      })
      this.structureForm = this.formBuilder.group({
        OrganizationBranchId: [this.structure?.OrganizationBranchId, Validators.required],
        IsBranch: [false , Validators.required],
        OfficeNumber:[""],
        ParentStructureId: [this.structure?.ParentStructureId],
        StructureName: [this.structure?.StructureName, Validators.required],
        Order: [this.structure?.Order, Validators.required],
        Weight: [this.structure?.Weight, Validators.required],
        RowStatus : [this.structure.RowStatus,Validators.required],
        Remark: [this.structure.Remark]
      })

      this.onBranchChange()


  }

  onBranchChange() {

    this.orgService.getOrgStructureSelectList(this.structure.OrganizationBranchId).subscribe(
      {
        next: (res) => this.parentStructureList = res.filter(x=>x.Id!==this.structure.Id),
        error: (err) => console.error(err)

      }

    )

  }

  submit() {

    if (this.structureForm.valid) {

      let orgStruct : OrganizationalStructure= {
        Id: this.structure.Id,
        OrganizationBranchId: this.structureForm.value.OrganizationBranchId,
        ParentStructureId: this.structureForm.value.ParentStructureId,
        StructureName: this.structureForm.value.StructureName,
        Order: this.structureForm.value.Order,
        Weight: this.structureForm.value.Weight,
        RowStatus: this.structureForm.value.RowStatus,
        Remark: this.structureForm.value.Remark,
        IsBranch:this.structureForm.value.IsBranch,
        OfficeNumber : this.structureForm.value.OfficeNumber,
        BranchName: '',
        ParentStructureName: ''
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

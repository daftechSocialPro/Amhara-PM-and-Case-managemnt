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
  
  constructor(private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService, private activeModal: NgbActiveModal, private userService: UserService) {
    
    
  }
  
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    console.log('this.structure: ', this.structure);
    this.getBranchList()
    this.structureForm = this.formBuilder.group({
      OrganizationBranchId: ["", Validators.required],
      IsBranch: [this.structure?.IsBranch , Validators.required],
      OfficeNumber:[""],
      ParentStructureId: [""],
      StructureName: [this.structure?.StructureName, Validators.required],
      Order: [this.structure?.Order, Validators.required],
      Weight: [this.structure?.Weight, Validators.required],
      RowStatus : [this.structure.RowStatus,Validators.required],
      Remark: [this.structure.Remark]
    })
    
    
    
    
  }
  
  getBranchList(){
    this.orgService.getOrgBranchSelectList(this.user.SubOrgId).subscribe(
      {
        next: (res) => {
          //debugger
          this.branchList = res
          // console.log('this.branchList: ', this.branchList);
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
        next: (res) => 
        {
          this.parentStructureList = res.filter(x=>x.Id!==this.structure.Id)
          // console.log('this.parentStructureList: ', this.parentStructureList);
          const parent = this.parentStructureList.find(x => x.Id == this.structure?.ParentStructureId)
          this.structureForm.controls["ParentStructureId"].setValue(parent?.Id)
          
        },
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
  
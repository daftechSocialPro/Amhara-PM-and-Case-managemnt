
import { Component, Input,Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { OrganizationService } from '../../organization.service';
import { OrganizationBranch } from '../org-branch';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent {
  toast !: toastPayload;
  branchForm!:FormGroup
  @Input() branch ! :OrganizationBranch;
  @Output() result :boolean = false;

  constructor(private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('branch',this.branch)

    this.branchForm = this.formBuilder.group({
      Name: [this.branch.Name, Validators.required],
      PhoneNumber: [this.branch.PhoneNumber, Validators.required],
      Address: [this.branch.Address, Validators.required],
      RowStatus:[this.branch.RowStatus,Validators.required],
      Remark: [this.branch.Remark]
    });
  }

  submit() {
    console.log("value",this.branchForm.value)

    if (this.branchForm.valid) {
      let branchParmater : OrganizationBranch={
        Id: this.branch.Id,
        Name:this.branchForm.value.Name,
        PhoneNumber : this.branchForm.value.PhoneNumber,
        Address : this.branchForm.value.Address,
        Remark : this.branchForm.value.Remark,
        RowStatus : this.branchForm.value.RowStatus
        }
      this.orgService.orgBranchUpdate(branchParmater).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Organizational Branch Successfully Updated',
            title: 'Successfully Update.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal();
          this.branchForm = this.formBuilder.group({

            Name: [''],
            PhoneNumber: [''],
            Address: [''],
            RowStatus:[''],
            Remark: ['']
          })

          this.result = true

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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { OrganizationService } from '../../organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  
  @Output() result = new EventEmitter<boolean>(); 

  toast !: toastPayload;
  branchForm!:FormGroup

  constructor(private formBuilder: FormBuilder, 
    private orgService: OrganizationService, 
    private commonService: CommonService,
     private activeModal: NgbActiveModal,
    public translate: TranslateService) { }

  ngOnInit(): void {

    this.branchForm = this.formBuilder.group({
      Name: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Remark: ['']
    });
  }

  submit() {

    if (this.branchForm.valid) {
      this.orgService.OrgBranchCreate(this.branchForm.value).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Organizational Branch Successfully Created',
            title: 'Successfully Created.',
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
            Remark: ['']
          })

          this.result.emit(true)

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

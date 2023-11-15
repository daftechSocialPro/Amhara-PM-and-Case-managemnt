import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';

@Component({
  selector: 'app-assign-case',
  templateUrl: './assign-case.component.html',
  styleUrls: ['./assign-case.component.css']
})

export class AssignCaseComponent implements OnInit {

  @Input() caseId!: string
  caseForm !: FormGroup;
  Branches !: SelectList[]
  Structures !: SelectList[]
  Employees !: SelectList[]
  toast!: toastPayload
  user!: UserView


  constructor(
    private activeModal: NgbActiveModal,
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private caseService: CaseService,
    private commonService: CommonService,
    private userService : UserService) {

    this.caseForm = this.formBuilder.group({
      selectwho: [0, Validators.required],
      Structure: ['', Validators.required],
      ForEmployee: [''],
      CCto: ['', Validators.required]
    })



  }
  ngOnInit(): void {

    this.getBranches()
    this.user  = this.userService.getCurrentUser()

  }
  getBranches() {
    this.organizationService.getOrgBranchSelectList().subscribe({
      next: (res) => {
        this.Branches = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  getStructures(branchId: string) {

    this.organizationService.getOrgStructureSelectList(branchId).subscribe({
      next: (res) => {
        this.Structures = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  getEmployees(structureId: string) {

    this.organizationService.getEmployeesBystructureId(structureId).subscribe({
      next: (res) => {
        this.Employees = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }




  submit() {

    if (this.caseForm.valid) {



      this.caseService.assignCase(
        {
          CaseId:this.caseId,
          AssignedByEmployeeId: this.user.EmployeeId,
          AssignedToEmployeeId: this.caseForm.value.ForEmployee||null,
          AssignedToStructureId:this.caseForm.value.Structure,
          ForwardedToStructureId:this.caseForm.value.CCto
        }
      ).subscribe({
        next: (res) => {
          this.toast = {
            message: ' Case Assigned Successfully',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal();
          
        }, error: (err) => {

          this.toast = {
            message: 'Something went wrong',
            title: 'Network Error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
         // this.closeModal();

        }
      })
    }
    else {

    }

  }

  closeModal() {

    this.activeModal.close()
  }

}

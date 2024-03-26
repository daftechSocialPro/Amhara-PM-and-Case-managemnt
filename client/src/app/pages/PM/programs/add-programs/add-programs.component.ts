import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProgramBudgetYear, SelectList } from 'src/app/pages/common/common';
import { BudgetYearService } from 'src/app/pages/common/budget-year/budget-year.service';
import { ProgramService } from '../programs.services';
import { Program } from '../Program';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { BudgetYear } from '../../../common/common';
@Component({
  selector: 'app-add-programs',
  templateUrl: './add-programs.component.html',
  styleUrls: ['./add-programs.component.css']
})
export class AddProgramsComponent implements OnInit {

  @Input() program!: Program
  user!: UserView
  toast !: toastPayload;
  programForm!: FormGroup;
  programBudgetYears!: SelectList[];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private budgetYearService: BudgetYearService,
    private programService: ProgramService,
    private commonService: CommonService,
    private userSevice: UserService) { }

  ngOnInit(): void {

    this.user = this.userSevice.getCurrentUser()
    this.budgetYearService.getProgramBudgetYearSelectList(this.user.SubOrgId).subscribe({
      next: (res) => {
        console.log("res", res)
        this.programBudgetYears = res
        const BudgetYear = this.programBudgetYears.find(x => x.Name == this.program.ProgramBudgetYear)?.Id
        this.programForm.controls['ProgramBudgetYearId'].setValue(BudgetYear)
      }, error: (err) => {

      }
    })
    if (this.program) {
      this.programForm = this.formBuilder.group({
        Id: [this.program.Id],
        ProgramBudgetYearId: ['', Validators.required],
        ProgramName: [this.program.ProgramName, Validators.required],
        ProgramPlannedBudget: [this.program.ProgramPlannedBudget, Validators.required],
        Remark: [this.program.Remark],
        SubsidiaryOrganizationId: [this.user.SubOrgId]

      })

    }
    else {
      this.programForm = this.formBuilder.group({

        ProgramBudgetYearId: ['', Validators.required],
        ProgramName: ['', Validators.required],
        ProgramPlannedBudget: [0, Validators.required],
        Remark: [''],
        SubsidiaryOrganizationId: [this.user.SubOrgId]

      })
    }

  }

  submit() {

    if (this.programForm.valid) {
      if (this.program) {

        this.programService.updateProgram(this.programForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: "Program Successfully Updated",
              title: 'Successfully Updated.',
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
              message: err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);

            console.log(err)
          }
        })
      }
      else {
        this.programService.createProgram(this.programForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: "Program Successfully Created",
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
              message: err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);

            console.log(err)
          }
        })
      }


    }

  }

  closeModal() {
    this.activeModal.close();
  }


}

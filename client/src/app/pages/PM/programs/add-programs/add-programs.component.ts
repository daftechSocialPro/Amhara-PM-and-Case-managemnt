import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProgramBudgetYear, SelectList } from 'src/app/pages/common/common';
import { BudgetYearService } from 'src/app/pages/common/budget-year/budget-year.service';
import { ProgramService } from '../programs.services';
import { Program } from '../Program';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
@Component({
  selector: 'app-add-programs',
  templateUrl: './add-programs.component.html',
  styleUrls: ['./add-programs.component.css']
})
export class AddProgramsComponent implements OnInit {

  toast !: toastPayload;
  programForm!: FormGroup;
  programBudgetYears!: SelectList[];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private budgetYearService: BudgetYearService,
    private programService: ProgramService,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.budgetYearService.getProgramBudgetYearSelectList().subscribe({
      next: (res) => {
        console.log("res", res)
        this.programBudgetYears = res
      }, error: (err) => {

      }
    })

    this.programForm = this.formBuilder.group({

      ProgramBudgetYearId: ['', Validators.required],
      ProgramName: ['', Validators.required],
      ProgramPlannedBudget: [0, Validators.required],
      Remark: ['']

    })

  }

  submit() {

    if (this.programForm.valid) {
  
      this.programService.createProgram(this.programForm.value).subscribe({
        next: (res) => {
          this.toast = {
            message: "Program Successfully Creted",
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

  closeModal() {
    this.activeModal.close();
  }


}

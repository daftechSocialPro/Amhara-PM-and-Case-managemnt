import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { AddBudgetyearComponent } from '../add-budgetyear/add-budgetyear.component';
import { BudgetYearService } from '../budget-year.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';


@Component({
  selector: 'app-add-programbudgetyear',
  templateUrl: './add-programbudgetyear.component.html',
  styleUrls: ['./add-programbudgetyear.component.css']
})
export class AddProgrambudgetyearComponent implements OnInit {

  toast !: toastPayload;
  programBudgetForm!: FormGroup;
  user!:UserView
  @Output() result: boolean = false


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private budgetYearService: BudgetYearService,
    private activeModal:NgbActiveModal,
    private userService : UserService
    ) {
    this.programBudgetForm = this.formBuilder.group({

      Name: ['', Validators.required],
      FromYear: [0, Validators.required],
      ToYear: [0, Validators.required],
      Remark: [''],
      CreatedBy: ['']

    })
  }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

  }
  submit() {

    console.log(this.programBudgetForm.value)

    this.programBudgetForm.controls['CreatedBy'].setValue(this.user.UserID)

    if (this.programBudgetForm.valid) {
      this.budgetYearService.CreateProgramBudgetYear(this.programBudgetForm.value).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Program Budget Year Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          this.result = true;
          this.modalClose();
          this.programBudgetForm = this.formBuilder.group({

            Name: [''],
            FromYear: [0],
            ToYear: [0],
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
    else {
      this.toast = {
        message: 'Please Check Your Input',
        title: 'Form Error',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);
    }

  }

  modalClose() {

    this.activeModal.close()
  }



}

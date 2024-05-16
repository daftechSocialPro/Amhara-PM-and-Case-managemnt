import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../pm.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KpiPostDto } from '../kpi';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-add-kpi',
  templateUrl: './add-kpi.component.html',
  styleUrls: ['./add-kpi.component.css']
})
export class AddKpiComponent implements OnInit {

  user!: UserView
  kpiForm!: FormGroup
  activeYearsSelected!: number[]
  toast!: toastPayload;
  
  constructor(
    private pmService: PMService,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.kpiForm = this.formBuilder.group({
      Title: ["", Validators.required],
      StartYear: [null, Validators.required],
      ActiveYears: [null, Validators.required],
      EncoderOrganizationName: ["", Validators.required],
      EvaluatorOrganizationName: ["", Validators.required],
      Remark: [""],
    })
  }


  Submit(){
    if(this.kpiForm.valid){
      const kpiData: KpiPostDto = {
        Title : this.kpiForm.value.Title,
        StartYear : this.kpiForm.value.StartYear,
        ActiveYearsString  : this.kpiForm.value.ActiveYears,
        EncoderOrganizationName : this.kpiForm.value.EncoderOrganizationName,
        EvaluatorOrganizationName : this.kpiForm.value.EvaluatorOrganizationName,
        CreatedBy : this.user.UserID,
        Remark: this.kpiForm.value.Title
      }

      this.pmService.AddKPI(kpiData).subscribe({
        next: (res) => {
          this.toast = {
            message: ' KPI Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal()

        },
        error: (err) => {


          this.toast = {
            message: err.message,
            title: 'Something Went Wrong.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast)


        }
      })
    }
  }

  closeModal() {
    this.activeModal.close()
  }

}

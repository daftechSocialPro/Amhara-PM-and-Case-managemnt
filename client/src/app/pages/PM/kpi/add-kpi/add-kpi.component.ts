import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../pm.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KpiPostDto } from '../kpi';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';

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
  subsidiaryOrganizationSelectList: SelectList[] = []
  
  constructor(
    private pmService: PMService,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private orgService: OrganizationService 
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getSubOrgSelectList()
    this.kpiForm = this.formBuilder.group({
      Title: ["", Validators.required],
      StartYear: [null, Validators.required],
      ActiveYears: [null, Validators.required],
      EncoderOrganizationName: [""],
      EvaluatorOrganizationName: [""],
      HasSubsidiaryOrganization: [false, Validators.required],
      SubsidiaryOrganizationId: [null],
      Remark: [""],
    })
  }


  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subsidiaryOrganizationSelectList = res,
      error: (err) => console.error(err)
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
        HasSubsidiaryOrganization: this.kpiForm.value.HasSubsidiaryOrganization,
        SubsidiaryOrganizationId: this.kpiForm.value.SubsidiaryOrganizationId,
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

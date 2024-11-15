import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../pm.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KpiGetWithoutDetailsDto, KpiPostDto } from '../kpi';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-kpi',
  templateUrl: './add-kpi.component.html',
  styleUrls: ['./add-kpi.component.css']
})
export class AddKpiComponent implements OnInit {

  @Input() kpi!: any
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
    private orgService: OrganizationService,
    public translate: TranslateService 
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getSubOrgSelectList()

    if(this.kpi){
      this.kpiForm = this.formBuilder.group({
        Title: [this.kpi.Title, Validators.required],
        StartYear: [this.kpi.StartYear, Validators.required],
        ActiveYears: [this.kpi.ActiveYearsString, Validators.required],
        EncoderOrganizationName: [this.kpi.EncoderOrganizationName],
        EvaluatorOrganizationName: [this.kpi.EvaluatorOrganizationName],
        HasSubsidiaryOrganization: [this.kpi.HasSubsidiaryOrganization, Validators.required],
        SubsidiaryOrganizationId: [this.kpi.SubsidiaryOrganizationId],
        Remark: [""],
      })
    }
    else{
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

    
  }


  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subsidiaryOrganizationSelectList = res,
      error: (err) => console.error(err)
    })
  }

  Submit(){
    if(this.kpiForm.valid){
      if(this.kpi){
        const kpiData: KpiGetWithoutDetailsDto = {
          Id: this.kpi.Id,
          Title : this.kpiForm.value.Title,
          StartYear : this.kpiForm.value.StartYear,
          ActiveYearsString  : this.kpiForm.value.ActiveYears,
          EncoderOrganizationName : this.kpiForm.value.EncoderOrganizationName,
          EvaluatorOrganizationName : this.kpiForm.value.EvaluatorOrganizationName,
          CreatedBy : this.kpi.CreatedBy,
          HasSubsidiaryOrganization: this.kpiForm.value.HasSubsidiaryOrganization,
          SubsidiaryOrganizationId: this.kpiForm.value.SubsidiaryOrganizationId,
          Remark: this.kpiForm.value.Title
        }

        this.pmService.UpdateKpi(kpiData).subscribe({
          next: (res) => {
            this.toast = {
              message: 'KPI Successfully Updated',
              title: 'Successfully Updated.',
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
      else{
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
              message: 'KPI Successfully Created',
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
  }

  closeModal() {
    this.activeModal.close()
  }

}

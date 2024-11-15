import { Component, Input, OnInit } from '@angular/core';
import { KPIGoalPostDto, KpiDetailPost, SimilarGoals } from '../../kpi';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { PMService } from '../../../pm.services';
import { IndividualConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-kpi-detail',
  templateUrl: './add-kpi-detail.component.html',
  styleUrls: ['./add-kpi-detail.component.css']
})
export class AddKpiDetailComponent implements OnInit{
  @Input() KpiId!: string
  @Input() HasSubsidiaryOrganization!: boolean
  @Input() GoalId!: string
  user!: UserView
  items!: any
  toast!: toastPayload;
  
  kpiDetails: SimilarGoals[] = []
  addKpiDetails: SimilarGoals = new SimilarGoals();

  kpiDetailsForm!: FormGroup




  constructor(
    private pmService: PMService,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    public translate: TranslateService
  ) { }


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

    this.kpiDetailsForm = this.formBuilder.group({
      Goal:[null, Validators.required],
    })
    if(this.GoalId){
      this.getKpiForAppend(this.GoalId)
    }
      
  }

  getKpiForAppend(GoalId: string){
    this.pmService.GetKpiDetailForEdit(GoalId).subscribe({ 
      next: (res) => {
        this.kpiDetailsForm.controls['Goal'].setValue(res.Goal)
      } 
    })
  }
  submit(){
    
    if(this.HasSubsidiaryOrganization){
      if(this.kpiDetailsForm.valid){
        const kpiDetailData : KPIGoalPostDto = {
          KPIId : this.KpiId,
          CreatedBy: this.user.UserID,
          Goal: this.kpiDetailsForm.value.Goal
          
          
        }
        this.pmService.AddKpiGoal(kpiDetailData).subscribe({
          next: (res) => {
            if(res.Success){
              this.toast = {
                message: ' KPI Goal Successfully Created',
                title: 'Successfully Created.',
                type: 'success',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast);
              this.closeModal()
            }
            else{
              this.toast = {
                message: res.Message,
                title: 'Something Went Wrong.',
                type: 'error',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast)
            }
            
  
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
    else{
      if(this.kpiDetails.length <= 0){
        this.toast = {
          message: 'Please add atleast one Item detail',
          title: 'Error',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
      }
      else{
        if(this.kpiDetailsForm.valid){
          let kpiDetailData : KpiDetailPost = {
            KPIId : this.KpiId,
            CreatedBy: this.user.UserID,
            Goal: this.kpiDetailsForm.value.Goal,
            Titles: this.kpiDetails,
            
          }
          if(this.GoalId){
            kpiDetailData.GoalId = this.GoalId
          }
          this.pmService.AddKPIDetail(kpiDetailData).subscribe({
            next: (res) => {
              if(res.Success){
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
              }
              else{
                this.toast = {
                  message: res.Message,
                  title: 'Something Went Wrong.',
                  type: 'error',
                  ic: {
                    timeOut: 2500,
                    closeButton: true,
                  } as IndividualConfig,
                };
                this.commonService.showToast(this.toast)
              }
              
    
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
    
  }

  newRow() {
    if (this.addKpiDetails.Title) {
      this.kpiDetails.unshift(this.addKpiDetails);
    }
    this.items = "";
    this.addKpiDetails = new SimilarGoals();
  }
  removeRow(itemId: string) {
    this.kpiDetails = this.kpiDetails.filter(x => x.Title != itemId);
  }

  closeModal() {
    this.activeModal.close()
  }

}

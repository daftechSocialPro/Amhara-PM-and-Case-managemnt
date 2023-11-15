import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { BudgetYearService } from 'src/app/pages/common/budget-year/budget-year.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { Program } from '../../programs/Program';
import { ProgramService } from '../../programs/programs.services';
import { PlanService } from '../plan.service';
import { Plan } from '../plans';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {

  toast !: toastPayload;
  planForm!: FormGroup;
  employee!: SelectList;
  Programs: SelectList[] = [];
  Structures: SelectList[] = [];
  Employees: SelectList[] = [];
  BudgetYears: SelectList[] = [];
  Branchs: SelectList[] = [];
  employeeList: SelectList[] = [];
  program!: Program;
  ProjectManagerId!: String;
  FinanceId!: string;


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private budgetYearService: BudgetYearService,
    private programService: ProgramService,
    private planService : PlanService,
    private commonService: CommonService,
    private orgService: OrganizationService) { }

  ngOnInit(): void {

    this.listEmployees();
    this.listPorgrams();
    this.listBranchs();
    this.planForm = this.formBuilder.group({

      PlanName: ['', Validators.required],
      BudgetYearId: ['', Validators.required],
      StructureId: ['', Validators.required],
      ProgramId: ['', Validators.required,],
      PlanWeight: [0, [Validators.required,Validators.max(this.program?.RemainingWeight)]],
      HasTask: [false, Validators.required],
      PlandBudget: [0, [Validators.required,Validators.max(this.program?.RemainingBudget)]],
      ProjectType: ['', Validators.required],
      Remark: ['']

    })

  }

  listStructuresbyBranchId(branchId: string) {

    this.orgService.getOrgStructureSelectList(branchId).subscribe({
      next: (res) => {
        this.Structures = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  listBranchs() {

    this.orgService.getOrgBranchSelectList().subscribe({
      next: (res) => {
        this.Branchs = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  listEmployees() {

    this.orgService.getEmployeesSelectList().subscribe({
      next: (res) => {
        this.employeeList = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }


  listPorgrams() {
    this.programService.getProgramsSelectList().subscribe({
      next: (res) => {
        this.Programs = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  OnPorgramChange(value: string) {

    this.budgetYearService.getBudgetYearByProgramId(value).subscribe({
      next: (res) => {
        this.BudgetYears = res
      }, error: (err) => {
        console.error(err)
      }
    })

    this.programService.getProgramById(value).subscribe({
      next: (res) => {
        this.program = res
      },
      error: (err) => {
        console.error(err)
      }
    })

  }

  selectEmployeePM(event: SelectList) {

    this.employee = event;
    this.ProjectManagerId = event.Id

  }
  selectEmployeeF(event: SelectList) {

    this.employee = event;
    this.FinanceId = event.Id

  }


  submit() {

    console.log("form", this.planForm.value)
    console.log("finance", this.FinanceId)
    console.log("pm", this.ProjectManagerId)

    if (!this.ProjectManagerId){

      this.toast = {
        message: "Project manager Not selected",
        title: 'Network error.',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);

      return
    }

    if (!this.FinanceId){
      this.toast = {
        message: "Finance Not selected",
        title: 'Network error.',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);

      return
    }

    if (this.planForm.valid) {

      let planValue: Plan = {
        BudgetYearId: this.planForm.value.BudgetYearId,
        HasTask: this.planForm.value.HasTask,
        PlanName: this.planForm.value.PlanName,
        PlanWeight: this.planForm.value.PlanWeight,
        PlandBudget: this.planForm.value.PlandBudget,
        ProgramId: this.planForm.value.ProgramId,
        ProjectType: this.planForm.value.ProjectType,
        Remark: this.planForm.value.Remark,
        StructureId: this.planForm.value.StructureId,
        ProjectManagerId: this.ProjectManagerId,
        FinanceId: this.FinanceId

      }

      this.planService.createPlan(planValue).subscribe({
        next: (res) => {
          this.toast = {
            message: "Plan Successfully Creted",
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
            message: 'Something went wrong!!',
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

  onBranchChange(branchId: string) {

    this.orgService.getOrgStructureSelectList(branchId).subscribe({
      next: (res) => {
        this.Structures = res
      }, error: (err) => {

        console.error(err)
      }

    })
  }

  
  closeModal() {
    this.activeModal.close();
  }



  weightChange(weight:string){

    if (this.program){
      if ( Number(weight)>this.program.RemainingWeight){

        this.toast = {
          message: "Weight can not be greater than Remaining weight",
          title: 'Form Validation.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);

        this.planForm.controls['PlanWeight'].setValue('')
      }
    }
  }


  
  budgetChange(budget:string){

    if (this.program){
      if ( Number(budget)>this.program.RemainingBudget){

        this.toast = {
          message: "Budget can not be greater than Remaining Budget",
          title: 'Form Validation.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);

        this.planForm.controls['PlandBudget'].setValue('')
      }
    }
  }

} 

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PMService } from '../../pm.services';
import { SelectList } from 'src/app/pages/common/common';
import { IPlanReportDetailDto } from './IplanReportDetai';
import * as XLSX from 'xlsx';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plan-report-today',
  templateUrl: './plan-report-today.component.html',
  styleUrls: ['./plan-report-today.component.css']
})
export class PlanReportTodayComponent implements OnInit {
  subOrgId!: string
  subOrgSelectList: SelectList[] = []
  user!: UserView
  serachForm!: FormGroup
  planReportDetail  !: IPlanReportDetailDto
  cnt: number = 0
  programs !: SelectList[]
  constructor(private formBuilder: FormBuilder,
     private pmService: PMService, 
     private userService: UserService,
      private orgService: OrganizationService,
      public translate: TranslateService) {

  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getSubOrgSelectList()
    this.serachForm = this.formBuilder.group({
      BudgetYear: ['',Validators.required],
      ProgramId: ['',Validators.required],
      ReportBy: ['Quarter'],
      SubOrg: ['']
    })
    this.GetProgramSelectList(this.user.SubOrgId)

    

  }

  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }
  
  Search() {

    this.pmService.getPlanDetailReport(this.serachForm.value.BudgetYear, this.serachForm.value.ReportBy,this.serachForm.value.ProgramId).subscribe({
      next: (res) => {
        console.log("plan report",res)

       this.planReportDetail = res 
       this.cnt= res.MonthCounts.length

      }, error: (err) => {
        console.error(err)
      }
    })

  }
  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  onSubOrgChange(event: any) {
    if (event.target.value !== "") {
      
      this.GetProgramSelectList(event.target.value)
    } else {
      this.GetProgramSelectList(this.user.SubOrgId)
    }
    
  }

  GetProgramSelectList(subOrgId: string){
    this.pmService.getProgramSelectList(subOrgId).subscribe({
      next: (res) => {
        this.programs = res
        console.log(res)
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PMService } from '../../pm.services';
import { IPlanReportByProgramDto } from './program-budget-report';
import * as XLSX from 'xlsx';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';

@Component({
  selector: 'app-program-budget-report',
  templateUrl: './program-budget-report.component.html',
  styleUrls: ['./program-budget-report.component.css']
})
export class ProgramBudgetReportComponent implements OnInit {

  subOrgId!: string
  subOrgSelectList: SelectList[] = []
  user!: UserView
  serachForm!: FormGroup
  PlanReportByProgramDto!:IPlanReportByProgramDto
  cnt:number = 0
  constructor(private formBuilder : FormBuilder,private pmService: PMService, private userService: UserService, private orgService: OrganizationService){

  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getSubOrgSelectList()
    this.serachForm = this.formBuilder.group({
      BudgetYear: ['',Validators.required],
      ReportBy: ['Quarter'],
      SubOrg: ['']
    })    
  }

  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }
  
  Search(){
    
    if(this.serachForm.value.SubOrg === ''){
      this.subOrgId = this.user.SubOrgId
    }
    else{
      this.subOrgId = this.serachForm.value.SubOrg
    }
    this.pmService.getProgramBudegtReport(this.subOrgId, this.serachForm.value.BudgetYear,this.serachForm.value.ReportBy).subscribe({
      next:(res)=>{
        console.log(res)
     
        this.PlanReportByProgramDto=res
        this.cnt=this.PlanReportByProgramDto?.MonthCounts.length
     
      },error:(err)=>{
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
}

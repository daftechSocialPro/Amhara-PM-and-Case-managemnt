import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { PMService } from '../../pm.services';
import { IPlannedReport } from '../planned-report/planned-report';
import * as XLSX from 'xlsx';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-estimated-coast',
  templateUrl: './estimated-coast.component.html',
  styleUrls: ['./estimated-coast.component.css']
})
export class EstimatedCoastComponent implements OnInit {

  subOrgId!: string
  subOrgSelectList: SelectList[] = []
  serachForm!: FormGroup
  estimatedCosts  !: any
  branchs!: SelectList[]
  structures !: SelectList[]
  user!: UserView
 

  constructor(
    private formBuilder: FormBuilder,
    private pmService: PMService,
    private orgService: OrganizationService,
    private userService: UserService,
    public translate: TranslateService) {

  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getSubOrgSelectList()
    this.serachForm = this.formBuilder.group({
      BudgetYear: ['', Validators.required],
      selectStructureId: ['', Validators.required],
      ReportBy: ['Quarter']
    })

    this.GetBranchSelectList(this.user.SubOrgId)

    

   


  }

  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }
  Search() {

    this.pmService.GetEstimatedCost(this.serachForm.value.selectStructureId,this.serachForm.value.BudgetYear).subscribe({
      next: (res) => {
             this.estimatedCosts = res 
             console.log(this.estimatedCosts)
             //this.cnt=  this.plannedreport?.pMINT

      }, error: (err) => {
        console.error(err)
      }
    })

  }

  OnBranchChange(branchId: string) {

    this.orgService.getOrgStructureSelectList(branchId).subscribe({
      next: (res) => {
        this.structures = res

      }, error: (err) => {
        console.error(err)
      }
    })

  }

  range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }

  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  onSubOrgChange(event: any) {
    if (event.target.value !== "") {
    
      this.GetBranchSelectList(event.target.value)
     
    }
    else {

      this.GetBranchSelectList(this.user.SubOrgId)
      
    }
    
  }

  GetBranchSelectList(subOrgId: string){
    this.orgService.getOrgBranchSelectList(subOrgId).subscribe({
      next: (res) => {

        this.branchs = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }

}
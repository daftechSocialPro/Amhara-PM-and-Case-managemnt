import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/common/common.service';
import { CaseService } from '../../case.service';
import { IEmployeePerformance } from './IEmployeePerformance';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-performance',
  templateUrl: './employee-performance.component.html',
  styleUrls: ['./employee-performance.component.css']
})
export class EmployeePerformanceComponent implements OnInit {

  subOrgSelectList: SelectList[] = []
  exportColumns?: any[];
  cols?: any [];
  user!: UserView
  selectedEmployeePerformance!: IEmployeePerformance;
  employePerformaces: IEmployeePerformance[] = [];
  subOrgId!: string;
  searchForm !: FormGroup
  constructor(private caseService: CaseService,
    private commonService : CommonService,
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private orgService: OrganizationService,
    public  translate: TranslateService) { 

    this.searchForm = this.formBuilder.group({

      key : [''],
      OrganizationName :['']

    })
    
  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getSubOrgSelectList()
    this.subOrgId = this.user.SubOrgId;
    this.getEmployeePerformanceList(this.user.SubOrgId, this.searchForm.value.key, this.searchForm.value.OrganizationName)
  }

  

  initCols() {
    this.cols = [
      { field: 'EmployeeName', header: 'Employee Name', customExportHeader: 'Request Number' },
      { field: 'EmployeeStructure', header: 'Employee Structure' },
      { field: 'ActualTimeTaken', header: 'Actual Time Taken (Hr.)' },
      { field: 'ExpectedTime', header: 'Expected Time (Hr.)' },     
      { field: 'PerformanceStatus', header: 'Performance Status' }, 
    ];
 
   
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  getEmployeePerformanceList(subOrgId: string, key : string, OrganizationName: string) {

    this.caseService.GetCaseEmployeePerformace(subOrgId, key, OrganizationName).subscribe({

      next: (res) => {
        this.employePerformaces = res
        this.initCols()
      }, error: (err) => {

        console.error(err)

      }
    })

  }

  applyStyles(value : string ){
   
    const styles = { 'background-color': value === 'OverPlan'?'#008000a3':value === 'UnderPlan'?'#ff00005c':'','color':value === 'OverPlan'||value === 'UnderPlan'?'white':'' };
    return styles;
  }

  getImage (value : string ){

    return this.commonService.createImgPath(value)
  }

  Search (){
    this.getEmployeePerformanceList(this.subOrgId, this.searchForm.value.key,this.searchForm.value.OrganizationName)
  }

  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  onSubChange(event: any) {
    if (event.target.value !== "") {
      this.getEmployeePerformanceList(event.target.value, this.searchForm.value.key, this.searchForm.value.OrganizationName)
      this.subOrgId = event.target.value
    } 
    else {
      this.getEmployeePerformanceList(this.user.SubOrgId, this.searchForm.value.key, this.searchForm.value.OrganizationName)
    }
  }

  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }

}

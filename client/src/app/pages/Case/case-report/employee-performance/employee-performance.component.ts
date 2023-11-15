import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/common/common.service';
import { CaseService } from '../../case.service';
import { IEmployeePerformance } from './IEmployeePerformance';

@Component({
  selector: 'app-employee-performance',
  templateUrl: './employee-performance.component.html',
  styleUrls: ['./employee-performance.component.css']
})
export class EmployeePerformanceComponent implements OnInit {

  exportColumns?: any[];
  cols?: any [];

  selectedEmployeePerformance!: IEmployeePerformance;
  employePerformaces: IEmployeePerformance[] = [];
  
  searchForm !: FormGroup
  constructor(private caseService: CaseService,private commonService : CommonService,private formBuilder: FormBuilder) { 

    this.searchForm = this.formBuilder.group({

      key : [''],
      OrganizationName :['']

    })
    
  }
  ngOnInit(): void {

    this.getEmployeePerformanceList(this.searchForm.value.key, this.searchForm.value.OrganizationName)
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

  getEmployeePerformanceList(key : string, OrganizationName: string) {

    this.caseService.GetCaseEmployeePerformace(key,OrganizationName).subscribe({

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
    this.getEmployeePerformanceList(this.searchForm.value.key,this.searchForm.value.OrganizationName)
  }

}

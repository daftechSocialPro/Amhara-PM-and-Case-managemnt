import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { PMService } from '../../pm.services';
import { FilterationCriteria } from '../progress-report/Iprogress-report';
import { GetActivityProgressComponent } from './get-activity-progress/get-activity-progress.component';
declare const $: any
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-performance-report',
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.css']
})
export class PerformanceReportComponent implements OnInit {

  serachForm!: FormGroup
  performanceReport  !: any
  branchs!: SelectList[]
  structures !: SelectList[]
  cnt: number = 0
  programs !: SelectList[]

  filterBY !:string

  constructor(
    private formBuilder: FormBuilder,
    private pmService: PMService,
    private orgService: OrganizationService,
    private modalService: NgbModal) {

  }

  ngOnInit(): void {

    this.serachForm = this.formBuilder.group({
      BudgetYear: ['', Validators.required],
      selectStructureId: ['', Validators.required],
      filterbyId:[0,Validators.required],
     
      Quarter:[null],
      Month:[null],
      FromDate:[null],
      ToDate:[null],
      ReportBy: ['Quarter']
    })
  

    this.orgService.getOrgBranchSelectList().subscribe({
      next: (res) => {

        this.branchs = res
      }, error: (err) => {
        console.error(err)
      }
    })

    $('#startDate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),
      onSelect: (date: any) => {
        

        if (date) {

          this.serachForm.controls['FromDate'].setValue(date[0]._month + "/" + date[0]._day + "/" + date[0]._year)


        }// this.StartDate = date


      },
    })
    $('#endDate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),
      onSelect: (date: any) => {
        

        if (date) {

          this.serachForm.controls['ToDate'].setValue(date[0]._month + "/" + date[0]._day + "/" + date[0]._year)


        }// this.StartDate = date


      },
    })


  }


  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }

  Search() {

    let filterationCriteria:FilterationCriteria={
     budgetYear:this.serachForm.value.BudgetYear,
     structureId:this.serachForm.value.selectStructureId,
     filterbyId:this.serachForm.value.filterbyId,
     reporttype:this.serachForm.value.ReportBy,
     Quarter:this.serachForm.value.Quarter,
     Month:this.serachForm.value.Month,
     FromDate:this.serachForm.value.FromDate,
     ToDate:this.serachForm.value.ToDate


    }

    this.pmService.GetPerformanceReport(filterationCriteria).subscribe({
      next: (res) => {

        console.log("progress st",res)
        this.performanceReport = res 
           // this.cnt = this.progressReportByStructure?.planDuration

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


  setFilterBY(value:string){

    this.filterBY = value
    
  }

  detail(activityId:string){

    let modalRef =this.modalService.open(GetActivityProgressComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.activityId= activityId
  }



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CaseService } from '../../case.service';
import { ICaseReport, ICaseReportChart } from '../ICaseReport';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';


declare const $: any
@Component({
  selector: 'app-case-report',
  templateUrl: './case-report.component.html',
  styleUrls: ['./case-report.component.css']
})
export class CaseReportComponent implements OnInit {

  subOrgSelectList: SelectList[] = []
  user!: UserView
  exportColumns?: any[];
  cols?: any [];
  data!: ICaseReportChart;
  data2 !: ICaseReportChart;
  serachForm!: FormGroup
  subOrgId!: string;

  caseReports!: ICaseReport[]
  selectedCaseReport !: ICaseReport
  constructor(private caseService: CaseService,
     private formBuilder: FormBuilder, 
     private userService: UserService, 
     private orgService: OrganizationService,
     public  translate: TranslateService) {
    this.serachForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      SubOrg: ['']
    })
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.subOrgId = this.user.SubOrgId;
    this.getSubOrgSelectList()
    $('#startDate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),
      onSelect: (date: any) => {
        

        if (date) {

          this.serachForm.controls['startDate'].setValue(date[0]._month + "/" + date[0]._day + "/" + date[0]._year)


        }// this.StartDate = date


      },
    })
    $('#endDate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),
      onSelect: (date: any) => {
        

        if (date) {

          this.serachForm.controls['endDate'].setValue(date[0]._month + "/" + date[0]._day + "/" + date[0]._year)


        }// this.StartDate = date


      },
    })

    this.getCaseReport(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChart(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChartByStatus(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)

  }


  initCols() {
    this.cols = [
      { field: 'CaseNumber', header: 'Case Number', customExportHeader: 'Request Number' },
      { field: 'CaseType', header: 'Case Type' },
      { field: 'OnStructure', header: 'On Structure' },
      { field: 'OnEmployee', header: 'On Employee' },
     
      { field: 'PhoneNumber', header: 'Phone Number' },
      { field: 'CreatedDateTime', header: 'Created At' },
      { field: 'CaseStatus', header: 'Case Status' },
    ];
 
   
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }






  getChange(elapsTime: string) {
    var hours = Math.abs(Date.now() - new Date(elapsTime).getTime()) / 36e5;
    return Math.round(hours);
  }
  getChange2(elapsTime: string) {

    var timeDiff =  Math.abs(Date.now() - new Date(elapsTime).getTime());
    var hours = timeDiff/ 36e5;

    if (hours < 1) {
      const minutes = Math.round(timeDiff / 60000);
      return `${minutes} M`;
    } else if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days} D , ${Math.round(remainingHours)} Hr.`;
    } else {
      return `${Math.round(hours)} Hr.`;
    }
  }


  getCaseReport(subOrgId: string, startAt?: string, endAt?: string) {
    this.caseService.GetCaseReport(subOrgId, startAt, endAt).subscribe({
      next: (res) => {
        this.caseReports = res
        this.initCols()
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  getCaseReportChart(subOrgId: string, startAt?: string, endAt?: string) {

    this.caseService.GetCaseReportChart(subOrgId, startAt, endAt).subscribe({
      next: (res) => {
        this.data = res;
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  getCaseReportChartByStatus(subOrgId: string, startAt?: string, endAt?: string) {

    this.caseService.GetCaseReportChartByStatus(subOrgId, startAt, endAt).subscribe({
      next: (res) => {
        this.data2 = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }


  Search() {

    
    this.getCaseReport(this.subOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChart(this.subOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChartByStatus(this.subOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)


  }

  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  onSubChange(event: any) {
    if (event.target.value !== "") {
      this.getCaseReport(event.target.value, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.getCaseReportChart(event.target.value, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.getCaseReportChartByStatus(event.target.value, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.subOrgId = event.target.value
    } 
    else {
      this.getCaseReport(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.getCaseReportChart(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.getCaseReportChartByStatus(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.subOrgId = this.user.SubOrgId
    }
  }

  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }



}

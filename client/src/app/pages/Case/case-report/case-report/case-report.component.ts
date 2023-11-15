import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CaseService } from '../../case.service';
import { ICaseReport, ICaseReportChart } from '../ICaseReport';


declare const $: any
@Component({
  selector: 'app-case-report',
  templateUrl: './case-report.component.html',
  styleUrls: ['./case-report.component.css']
})
export class CaseReportComponent implements OnInit {

  exportColumns?: any[];
  cols?: any [];
  data!: ICaseReportChart;
  data2 !: ICaseReportChart;
  serachForm!: FormGroup

  caseReports!: ICaseReport[]
  selectedCaseReport !: ICaseReport
  constructor(private caseService: CaseService, private formBuilder: FormBuilder) {
    this.serachForm = this.formBuilder.group({
      startDate: [''],
      endDate: ['']
    })
  }

  ngOnInit(): void {

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




    this.getCaseReport(this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChart(this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChartByStatus(this.serachForm.value.startDate, this.serachForm.value.endDate)




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


  getCaseReport(startAt?: string, endAt?: string) {
    this.caseService.GetCaseReport(startAt, endAt).subscribe({
      next: (res) => {
        this.caseReports = res
        this.initCols()
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  getCaseReportChart(startAt?: string, endAt?: string) {

    this.caseService.GetCaseReportChart(startAt, endAt).subscribe({
      next: (res) => {
        this.data = res;
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  getCaseReportChartByStatus(startAt?: string, endAt?: string) {

    this.caseService.GetCaseReportChartByStatus(startAt, endAt).subscribe({
      next: (res) => {
        this.data2 = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }


  Search() {

    
    this.getCaseReport(this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChart(this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getCaseReportChartByStatus(this.serachForm.value.startDate, this.serachForm.value.endDate)


  }

  



}

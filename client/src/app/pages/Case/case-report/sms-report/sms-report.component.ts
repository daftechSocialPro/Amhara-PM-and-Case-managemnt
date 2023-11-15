import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaseService } from '../../case.service';
import { ICaseReportChart, ICaseReport } from '../ICaseReport';
import { ISMSReport } from './ISMSReport';
declare const $: any

@Component({
  selector: 'app-sms-report',
  templateUrl: './sms-report.component.html',
  styleUrls: ['./sms-report.component.css']
})
export class SmsReportComponent  implements OnInit {

 
  serachForm!: FormGroup

  smsReports!: ISMSReport[]
  selectedSmsReport !: ISMSReport

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




    this.getSMSReport(this.serachForm.value.startDate, this.serachForm.value.endDate)
   
  }



  getSMSReport(startAt?: string, endAt?: string) {
    this.caseService.GetSMSReport(startAt, endAt).subscribe({
      next: (res) => {
        this.smsReports = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }




  Search() {

    this.getSMSReport(this.serachForm.value.startDate, this.serachForm.value.endDate)
    


  }
}
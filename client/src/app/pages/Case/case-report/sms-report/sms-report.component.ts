import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaseService } from '../../case.service';
import { ICaseReportChart, ICaseReport } from '../ICaseReport';
import { ISMSReport } from './ISMSReport';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
declare const $: any

@Component({
  selector: 'app-sms-report',
  templateUrl: './sms-report.component.html',
  styleUrls: ['./sms-report.component.css']
})
export class SmsReportComponent  implements OnInit {

  subOrgSelectList: SelectList[] = []
  subOrgId!: string;
  user!: UserView
  serachForm!: FormGroup

  smsReports!: ISMSReport[]
  selectedSmsReport !: ISMSReport

  constructor(private caseService: CaseService, private formBuilder: FormBuilder, private userService: UserService, private orgService: OrganizationService) {
    this.serachForm = this.formBuilder.group({
      startDate: [''],
      endDate: ['']
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

    this.getSMSReport(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
   
  }



  getSMSReport(subOrgId: string, startAt?: string, endAt?: string) {
    this.caseService.GetSMSReport(subOrgId, startAt, endAt).subscribe({
      next: (res) => {
        this.smsReports = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }




  Search() {

    this.getSMSReport(this.subOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
    


  }

  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  onSubChange(event: any) {
    if (event.target.value !== "") {
      this.getSMSReport(event.target.value, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.subOrgId = event.target.value
    } 
    else {
      this.getSMSReport(this.user.SubOrgId, this.serachForm.value.startDate, this.serachForm.value.endDate)
      this.subOrgId = this.user.SubOrgId
    }
  }

  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from '../common/organization/organization.service';
import { IDashboardDto } from './IDashboard';
import { UserView } from '../pages-login/user';
import { UserService } from '../pages-login/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailReportComponent } from '../Case/case-report/case-detail-report/detail-report/detail-report.component';
declare const $: any

@Component({
  selector: 'app-casedashboard',
  templateUrl: './casedashboard.component.html',
  styleUrls: ['./casedashboard.component.css']
})
export class CasedashboardComponent implements OnInit {
  serachForm!: FormGroup
  dashboardDtos! :IDashboardDto
  user! : UserView

  stackedData:any
  stackedOptions:any

  selectedYear : number= 2016

  constructor(private modalService : NgbModal, private orgService: OrganizationService, private formBuilder: FormBuilder, private userService: UserService) {
    this.serachForm = this.formBuilder.group({
      startDate: [''],
      endDate: ['']
    })
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
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
    this.getDashboardReport(this.serachForm.value.startDate, this.serachForm.value.endDate)
    this.getBarChart();


  this.stackedOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#000'
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false
        }
    },
    scales: {
        x: {
            stacked: true,
            ticks: {
                color: '#000'
            },
            grid: {
                color: 'rgba(255,255,255,0.2)'
            }
        },
        y: {
            stacked: true,
            ticks: {
                color: '#000'
            },
            grid: {
                color: 'rgba(255,255,255,0.2)'
            }
        }
    }
};


  }

  

  getDashboardReport (startAt?: string, endAt?: string) {
    this.orgService.getDashboardReport(this.user.SubOrgId,startAt, endAt).subscribe({
      next: (res) => {
        this.dashboardDtos = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  getBarChart (){
    this.orgService.getDashboardLineChart(this.user.SubOrgId,this.selectedYear).subscribe({
      next:(res)=>{
        this.stackedData = res 
      },error:(err)=>{
        console.error(err)
      }

    })
  }
  
  Search() {

    this.getDashboardReport(this.serachForm.value.startDate, this.serachForm.value.endDate)
    


  }
  detail(caseId : string) {
    let modalRef = this.modalService.open(DetailReportComponent, { size: "xl", backdrop: "static" })
    modalRef.componentInstance.CaseId = caseId
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from '../../case.service';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { ICaseDetailReport } from './Icasedetail';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-case-detail-report',
  templateUrl: './case-detail-report.component.html',
  styleUrls: ['./case-detail-report.component.css']
})
export class CaseDetailReportComponent implements OnInit {

  subOrgSelectList: SelectList[] = []
  user!: UserView
  exportColumns?: any[];
  cols?: any [];
  detailReports !: ICaseDetailReport[]
  constructor(private modalService: NgbModal, 
    private caseService: CaseService,
     private userService: UserService,
     private orgService: OrganizationService,
     public  translate: TranslateService) {

  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getSubOrgSelectList()
    this.getDetailReports(this.user.SubOrgId)
   
  }

  getDetailReports(subOrgId: string) {


    this.caseService.GetCaseDetailReport(subOrgId).subscribe({
      next: (res) => {

        this.detailReports = res
        this.initCols()
        console.log(res)

      }, error: (err) => {
        console.error(err)
      }
    })


  }

  initCols() {
    this.cols = [
      { field: 'CaseNumber', header: 'Case Number', customExportHeader: 'Request Number' },
      { field: 'ApplicantName', header: 'Applicant Name' },
      { field: 'LetterNumber', header: 'Letter Number' },
      { field: 'Subject', header: 'Subject' },
      { field: 'CaseTypeTitle', header: 'Case Type Title' },
      { field: 'PhoneNumber', header: 'Phone Number' },
      { field: 'Createdat', header: 'Created At' },
      { field: 'CaseTypeStatus', header: 'Case Type Status' },
    ];
 
   
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }



  detail(caseId : string) {
    let modalRef = this.modalService.open(DetailReportComponent, { size: "xl", backdrop: "static" })
    modalRef.componentInstance.CaseId = caseId
  }

  getChange(elapsTime: string) {
    var hours = Math.abs(Date.now() - new Date(elapsTime).getTime()) / 36e5;
   // alert(hours)
    
    return Math.round(hours);
  }  
  
  getChange2(elapsTime: string): string {
    const start = new Date(elapsTime);
    const now = new Date();

    // If elapsTime is in the future, return 0
    if (start > now) return "0 min.";

    // Define working hours
    const workStartHour = 2;   // 2 AM
    const workEndHour = 23;    // 11 PM
    const lunchStartHour = 12; // 12 PM
    const lunchEndHour = 13;   // 1 PM
    const workDayStart = (date: Date) => new Date(date.setHours(workStartHour, 0, 0, 0));
    const workDayEnd = (date: Date) => new Date(date.setHours(workEndHour, 0, 0, 0));

    // Helper function to check if it's a workday
    const isWorkday = (date: Date): boolean => {
        const day = date.getDay();
        return day >= 1 && day <= 5; // Monday to Friday
    };

    // Helper function to calculate working hours between two times on the same day
    const calculateWorkingHours = (start: Date, end: Date): number => {
        let totalHours = 0;

        const startHour = start.getHours();
        const endHour = end.getHours();

        // If both times are outside working hours, return 0
        if (startHour >= workEndHour || endHour < workStartHour) {
            return 0;
        }

        // Adjust the start and end times to fall within working hours
        const adjustedStart = new Date(start);
        const adjustedEnd = new Date(end);

        // Clamp start time to workStartHour if it's earlier
        if (adjustedStart.getHours() < workStartHour) {
            adjustedStart.setHours(workStartHour, 0, 0, 0);
        }

        // Clamp end time to workEndHour if it's later
        if (adjustedEnd.getHours() >= workEndHour) {
            adjustedEnd.setHours(workEndHour, 0, 0, 0);
        }

        // Exclude lunch break if necessary
        if (adjustedStart.getHours() < lunchStartHour && adjustedEnd.getHours() > lunchEndHour) {
            // Split the time into pre-lunch and post-lunch hours
            totalHours = (lunchStartHour - adjustedStart.getHours()) + (adjustedEnd.getHours() - lunchEndHour);
        } else if (adjustedEnd.getHours() <= lunchStartHour || adjustedStart.getHours() >= lunchEndHour) {
            // No lunch break overlap, simple difference
            totalHours = (adjustedEnd.getTime() - adjustedStart.getTime()) / 36e5; // Convert from milliseconds to hours
        }

        return totalHours;
    };

    // Loop through each day from elapsTime to now
    let totalWorkingHours = 0;
    let current = new Date(start);

    while (current < now) {
        // If it's a workday, accumulate working hours
        if (isWorkday(current)) {
            const dayEnd = workDayEnd(new Date(current));

            // Calculate working hours for the current day, stopping if we reach the 'now' time
            totalWorkingHours += calculateWorkingHours(current, new Date(Math.min(dayEnd.getTime(), now.getTime())));

        }

        // Move to the start of the next working day
        current.setDate(current.getDate() + 1);
        current = workDayStart(new Date(current)); // Start at 2 AM on the next day
    }

    // Convert total working hours into days, hours, and minutes
    const totalMinutes = totalWorkingHours * 60;
    const days = Math.floor(totalMinutes / 1440); // 1440 minutes in a day
    const remainingMinutesAfterDays = totalMinutes % 1440;
    const hours = Math.floor(remainingMinutesAfterDays / 60);
    const minutes = Math.round(remainingMinutesAfterDays % 60);

    // Construct the result string
    let result = '';
    if (days > 0) {
        result += `${days} D`;
    }
    if (hours > 0) {
        result += (result ? `, ` : '') + `${hours} Hr.`;
    }
    if (minutes > 0) {
        result += (result ? `, ` : '') + `${minutes} Min.`;
    }

    return result || '0 Min.';
}



  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  onSubChange(event: any) {
    if (event.target.value !== "") {
      this.getDetailReports(event.target.value)
    } 
    else {
      this.getDetailReports(this.user.SubOrgId)
    }
  }

  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }






}

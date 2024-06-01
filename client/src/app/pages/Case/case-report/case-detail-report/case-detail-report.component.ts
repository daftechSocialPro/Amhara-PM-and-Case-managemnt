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
  }  getChange2(elapsTime: string) {

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

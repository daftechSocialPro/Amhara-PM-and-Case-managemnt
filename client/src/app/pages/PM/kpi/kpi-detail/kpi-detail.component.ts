import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PMService } from '../../pm.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { ActivatedRoute } from '@angular/router';
import { KpiDetailItem, KpiDetailPost, KpiGetDto } from '../kpi';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddKpiDetailComponent } from './add-kpi-detail/add-kpi-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.css']
})
export class KpiDetailComponent implements OnInit {

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
  kpiId!: string;
  exportingToExcel = false;
  kpiData!: KpiGetDto
  user!: UserView
  yearLength!: number
  
  constructor(
    private userService: UserService,
    private pmService: PMService,
    private activatedROute: ActivatedRoute,
    private modalService: NgbModal,
    public translate: TranslateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ){}


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.kpiId = this.activatedROute.snapshot.paramMap.get('kpiId')!
    this.getKpiData(this.kpiId)
  }

  getKpiData(kpiId:string){
    this.pmService.GetKPIById(kpiId).subscribe({
      next:(res) => {
        this.kpiData = res
        this.yearLength = this.kpiData.ActiveYears.length
        console.log("this.KPIList",this.kpiData)
        
      }
    })
  }

  addKpi(KpiId: string){
    let modalRef = this.modalService.open(AddKpiDetailComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.KpiId = KpiId
    modalRef.componentInstance.HasSubsidiaryOrganization = this.kpiData.HasSubsidiaryOrganization
    modalRef.result.then(()=>{
      this.getKpiData(this.kpiId)
    })
  }

  appendKpi(KpiId: string, GoalId?: string){
    let modalRef = this.modalService.open(AddKpiDetailComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.KpiId = KpiId
    modalRef.componentInstance.HasSubsidiaryOrganization = this.kpiData.HasSubsidiaryOrganization
    modalRef.componentInstance.GoalId = GoalId
    modalRef.result.then(()=>{
      this.getKpiData(this.kpiId)
    })
  }
  getKpiYearData(itemYear: number,item: KpiDetailItem){
    if (item.KPIDatas.length == 0 || !item.KPIDatas) {
      return 0;
    }
    const data = item.KPIDatas.find(x => x.Year == itemYear);
    return data?.Data
  }



  roleMatch (value : string[]){
    return this.userService.roleMatch(value)
  }


  deleteKpiDetail(kpiId: string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this KPI Detail?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pmService.DeleteKPIDetail(kpiId).subscribe({
          next: (res) => {

            if (res.Success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.Message });
              this.getKpiData(this.kpiId)
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.Message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });


  }

  exportAsExcel(name:string) {
    this.exportingToExcel= true
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}
}

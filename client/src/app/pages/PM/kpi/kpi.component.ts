import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddKpiComponent } from './add-kpi/add-kpi.component';
import { PMService } from '../pm.services';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

  KPIList!: any
  
  constructor(
    private modalService : NgbModal,
    private pmService: PMService,
    private router: Router,
    public translate: TranslateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.getKPIList()
  }

  getKPIList(){
    this.pmService.GetKPIs().subscribe({
      next: (res) => {
        this.KPIList = res
        
      }
    })
  }
  addKpi(){
    let modalRef = this.modalService.open(AddKpiComponent, { size: 'xl', backdrop: 'static' })
    modalRef.result.then(()=>{
      this.getKPIList()
    })
  }
  exportAsExcel(){}

  routeToKPIDetail(kpiId: string) {
    this.router.navigate(['/kpiDetail',kpiId]);
  }


  editKpi(kpi: any) {
    let modalRef = this.modalService.open(AddKpiComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.kpi = kpi
    modalRef.result.then((res) => {
      this.getKPIList()
    })

  }



  deleteKpi(kpiId: string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this KPI?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pmService.DeleteKpi(kpiId).subscribe({
          next: (res) => {

            if (res.Success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.Message });
              this.getKPIList()
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
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddKpiComponent } from './add-kpi/add-kpi.component';
import { PMService } from '../pm.services';
import { Router } from '@angular/router';

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
    private router: Router
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
}

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddKpiComponent } from './add-kpi/add-kpi.component';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent {

  constructor(private modalService : NgbModal) { }


  filterBy:number=1
  items: number[] = Array(13).fill(0);
  items2: number[] = Array(4).fill(0);
  onFilterByChange(){
    if (this.filterBy==0){
      this.items= Array(36).fill(0);
      this.items2= Array(16).fill(0);
    }else  {
      this.items= Array(12).fill(0);
      this.items2= Array(4).fill(0);
    }
  }
  addKpi(){
    let modalRef = this.modalService.open(AddKpiComponent, { size: 'xl', backdrop: 'static' })
  }
  exportAsExcel(){}
}

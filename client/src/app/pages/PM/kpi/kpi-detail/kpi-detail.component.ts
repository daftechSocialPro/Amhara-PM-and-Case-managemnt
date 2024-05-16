import { Component, OnInit } from '@angular/core';
import { PMService } from '../../pm.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { ActivatedRoute } from '@angular/router';
import { KpiGetDto } from '../kpi';

@Component({
  selector: 'app-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.css']
})
export class KpiDetailComponent implements OnInit {

  kpiData!: KpiGetDto
  kpiId!: string
  user!: UserView
  yearLength!: number
  constructor(
    private userService: UserService,
    private pmService: PMService,
    private activatedROute: ActivatedRoute,

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

  exportAsExcel(){}
}

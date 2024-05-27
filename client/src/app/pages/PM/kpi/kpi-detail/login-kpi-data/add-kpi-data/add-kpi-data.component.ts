import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from 'src/app/pages/pm/pm.services';
import { KpiGetDto } from '../../../kpi';

@Component({
  selector: 'app-add-kpi-data',
  templateUrl: './add-kpi-data.component.html',
  styleUrls: ['./add-kpi-data.component.css']
})
export class AddKpiDataComponent implements OnInit {

  kpiId!: any;
  kpiData!: KpiGetDto
  yearLength!: number

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private pmService: PMService

  ){}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.kpiId = params.get('kpiId');
        
    });
    
    this.getkpi(this.kpiId);
  }

  getkpi(kpiId: any){
    this.pmService.GetKPIById(kpiId).subscribe({
      next : (res) => {
        this.kpiData = res
        this.yearLength = this.kpiData.ActiveYears.length
      }
    })
  }

}

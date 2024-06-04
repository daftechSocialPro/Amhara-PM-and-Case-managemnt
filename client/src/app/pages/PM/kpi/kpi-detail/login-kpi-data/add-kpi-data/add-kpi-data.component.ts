import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from 'src/app/pages/pm/pm.services';
import { KpiData, KpiDataPost, KpiDetailItem, KpiGetDto } from '../../../kpi';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';

@Component({
  selector: 'app-add-kpi-data',
  templateUrl: './add-kpi-data.component.html',
  styleUrls: ['./add-kpi-data.component.css']
})
export class AddKpiDataComponent implements OnInit {

  kpiId!: any;
  kpiData!: KpiGetDto
  yearLength!: number
  toast!: toastPayload;

  constructor(
    private route: ActivatedRoute,
    private pmService: PMService,
    private commonService: CommonService

  ){}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.kpiId = params.get('kpiId');
      console.log("this.kpiId", this.kpiId)
    });
    
    this.getkpi(this.kpiId);
  }

  getkpi(kpiId: any){
    this.pmService.GetKPIById(kpiId).subscribe({
      next : (res) => {
        this.kpiData = res
        this.yearLength = this.kpiData.ActiveYears.length
        console.log("this.kpiData", this.kpiData)
      }
    })
  }

  getKpiYearData(itemYear: number,item: KpiDetailItem){
    if (item.KPIDatas.length == 0 || !item.KPIDatas) {
      return 0;
    }
    const data = item.KPIDatas.find(x => x.Year == itemYear);
    return data?.Data
  }
  onKpiDataAdded(itmId: string,itemYear: number,event: any, createdBy: any){

    const kpiData : KpiDataPost = {
      KPIDetailId: itmId,
      Year: itemYear,
      Data: event.value,
      CreatedBy: createdBy
    }
    this.pmService.AddKPIData(kpiData).subscribe({
      next: (res) => {
        if(res.Success){
          this.toast = {
            message: 'KPI Data Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          
        }
        else{
          this.toast = {
            message: res.Message,
            title: 'Something Went Wrong.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast)
        }
        

      },
      error: (err) => {


        this.toast = {
          message: err.message,
          title: 'Something Went Wrong.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast)


      }

    })

  }

}

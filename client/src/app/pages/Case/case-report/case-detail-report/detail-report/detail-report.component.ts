import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from '../../../case.service';
import { ICaseProgressReport } from '../Icasedetail';


@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css'],

})
export class DetailReportComponent implements OnInit {

  @Input() CaseId!: string
  caseTypes : any 
  chartOptions2: any;
  CaseDetialReport !: ICaseProgressReport
  loading2:boolean=true
  constructor(private activeModal: NgbActiveModal, private caseService: CaseService) {

  }
  ngOnInit(): void {
    this.caseService.GetProgresReport(this.CaseId).subscribe({
      next: (res) => {
        this.CaseDetialReport = res
        this.generateGraph()
      
      }, error: (err) => {
        console.error(err)
      }
    })

    this.GetChildCaseTypes()
  }
  closeModal() {
    this.activeModal.close();
  }
  applyStyles(value : string ){

    const styles = { 'background-color': value.includes('Over Plan')?'#008000a3':value.includes('Under Plan')?'#ff00005c':'','color':value.includes('Over Plan')||value.includes('Under Plan')?'white':'' };
    return styles;
  }



  GetChildCaseTypes(){
    this.caseService.GetChildCaseTypes(this.CaseId).subscribe({
      next:(res)=>{

        this.caseTypes = res 


      }
    })
  }

  generateGraph(): void {

    this.chartOptions2 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: [ 'ስራውን ለመስራት የፈጀው ጊዜ በሰአት','መፍጀት የነበርበት ጊዜ በሰአት']
      },
      xAxis: {
        type: 'category',
        data: this.caseTypes.map((item: any) => 
        `${item.CaseTypeTitle} ${this.CaseDetialReport.HistoryProgress.filter((item2, index) => index+1 === item.OrderNumber)[0]?this.CaseDetialReport.HistoryProgress.filter((item2, index) => index+1 === item.OrderNumber)[0].ToEmployee:'(አልተላልፈም)'}`)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'መፍጀት የነበርበት ጊዜ በሰአት',
          type: 'bar',
          data: this.caseTypes.map((item: any) => item.MeasurementUnit==0? (item.Counter/60).toFixed(2):(item.MeasurementUnit==2 ?(item.Counter*24):item.Counter)),
          itemStyle: {
            color: 'grey' // Set the color for this series as blue
          }
        },
        {
          name: 'ስራውን ለመስራት የፈጀው ጊዜ በሰአት',
          type: 'bar',
          data: this.CaseDetialReport.HistoryProgress.map((item: any) => parseFloat(item.ElapsedTime.split(' ')[1]!= 'Hr.'? (item.ElapsedTime.split(' ')[0] / 60).toFixed(2):item.ElapsedTime.split(' ')[0])   



          ),


          itemStyle: {
            color: (params: any) => {
              const historyProgress = this.CaseDetialReport.HistoryProgress[params.dataIndex];

              const hisprogressdata =historyProgress? (parseFloat(historyProgress.ElapsedTime.split(' ')[1]!= 'Hr.'? ( Number(historyProgress.ElapsedTime.split(' ')[0]) / 60).toFixed(2):historyProgress.ElapsedTime.split(' ')[0])):0
              const caseType = this.caseTypes[params.dataIndex];
              const casedata = caseType? caseType.MeasurementUnit==0? (caseType.Counter/60).toFixed(2):(caseType.MeasurementUnit==2 ?(caseType.Counter*24):caseType.Counter):null

              console.log('casetype',casedata,'historyProgress',hisprogressdata)
              return hisprogressdata > casedata ? 'red' : 'green';
            }
          }
        }
      ]
    };

    this.loading2 = false
  }

}

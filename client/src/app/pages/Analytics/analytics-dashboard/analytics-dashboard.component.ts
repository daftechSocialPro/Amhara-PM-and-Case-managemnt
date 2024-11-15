import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalyticService } from './analytics.service';
import { EChartsOption } from 'echarts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit{

  
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  pieChartOption!: EChartsOption
  pieChartOption2!: EChartsOption
  barChartOption!: EChartsOption
  barChartOption2!: EChartsOption
  chartData!: any[]
  constructor(
    private analyticService: AnalyticService,
    public  translate: TranslateService
  ){}

  ngOnInit(): void {
      this.getBudgetData()
      
  }

  getBudgetData(){
    this.analyticService.getOverallBudget().subscribe({
      next: (res) => {
        this.chartData = res.PlannedBudget.map(x => ({value:x.SubOrganizationBudget,name:x.SubOrganiztionName}))
        this.getBudgetPieGraph(this.chartData)
        this.getBudgetBarChart(this.chartData)
        console.log("this.chartData",this.chartData)
        
        this.chartData = res.Usedbudget.map(x => ({value:x.SubOrganizationBudget,name:x.SubOrganiztionName}))
        this.getBudgetPieGraph2(this.chartData)
        this.getBudgetBarChart2(this.chartData)
        console.log("this.chartData2",this.chartData)

      }
    })
  }

  getBudgetPieGraph(chartData:any[]){

    this.pieChartOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: chartData
        }
      ]
    };
  }

  getBudgetPieGraph2(chartData:any[]){

    this.pieChartOption2 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: chartData
        }
      ]
    };
  }

  getBudgetBarChart(chartData:any[]){
    this.barChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: chartData.map(x => x.name),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: chartData.map(x =>({value: x.value}))
        }
      ]
    };
  }

  getBudgetBarChart2(chartData:any[]){
    this.barChartOption2 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: chartData.map(x => x.name),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: chartData.map(x =>({value: x.value}))
        }
      ]
    };
  }

  
}

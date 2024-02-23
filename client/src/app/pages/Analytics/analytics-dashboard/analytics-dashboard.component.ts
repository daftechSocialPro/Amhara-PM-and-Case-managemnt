import { Component, OnInit } from '@angular/core';
import { AnalyticService } from './analytics.service';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit{

  


  constructor(
    private analyticService: AnalyticService
  ){}

  ngOnInit(): void {
      this.getBudgetData()
  }

  getBudgetData(){
    this.analyticService.getOverallBudget().subscribe({
      next: (res) => {

      }
    })
  }

  getBudgetGraph(){

  }
}

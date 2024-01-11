import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SelectList } from 'src/app/pages/common/common';
import { ProgramService } from '../../programs/programs.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PlanService } from '../../plans/plan.service';
import { TaskService } from '../../tasks/task.service';
import { TaskView } from '../../tasks/task';


@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.css']
})
export class TaskReportComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartOption!: EChartsOption
  planSelectList: SelectList[] = []
  programSelectList: SelectList[] = []
  user!: UserView
  taskSelectList: any
  task!: TaskView
  labelNames!:string[]
  plannedBudget!: number[]
  usedBudget!: number[]

  constructor(
    private programService: ProgramService,
    private userService: UserService,
    private planService: PlanService,
    private taskService: TaskService
    ){}
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.getProgramSelectList(this.user.SubOrgId)


  }
  
  ngAfterViewInit(): void {
    
  }

  onTaskChange(event:any){
    if (event.target.value !== "") {

      this.taskService.getSingleTask(event.target.value).subscribe({
        next:(res) => {
          this.task = res
          this.labelNames = this.task!.ActivityViewDtos!.map(dto => dto.Name);
          this.plannedBudget = this.task!.ActivityViewDtos!.map(dto => dto.PlannedBudget);
          this.usedBudget = this.task!.ActivityViewDtos!.map(dto => dto.UsedBudget)
          console.log('this.task!.ActivityViewDtos!: ', this.task!.ActivityViewDtos!);
          this.chartOption = {
    
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['Planned Budget', 'Used Budget']
            },
            grid: {
              left: '10%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'value'
              }
            ],
            yAxis: [
              {
                type: 'category',
                axisTick: {
                  show: false
                },
                data: this.labelNames
              }
            ],
            series: [
              
              {
                name: 'Planned',
                type: 'bar',
                stack: 'Total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: this.plannedBudget
              },
              {
                name: 'Used',
                type: 'bar',
                stack: 'Total',
                label: {
                  show: true,
                  position: 'inside'
                },
                emphasis: {
                  focus: 'series'
                },
                data: this.usedBudget
              }
            ]
          };
        },
        error: (err) => {
          console.error(err)
        }
      })

      
    } 
  }
  onProgramChange(event: any) {
    if (event.target.value !== "") {
      this.getPlanSelectList(event.target.value)
    } else {
      
    }
  }
  onPlanChange(event: any) {
    if (event.target.value !== "") {
      this.getTaskselectList(event.target.value)
      
    } else {
      
    }
  }

  getProgramSelectList(subOrgId: string){
    this.programService.getProgramsSelectList(subOrgId).subscribe({
      next: (res) => {
        this.programSelectList = res
        
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getPlanSelectList(proId: string){
    this.planService.getPlanSelectList(proId).subscribe({
      next: (res) => {
        this.planSelectList = res
       
      },
      error: (err) => {
        console.error(err)
      }
    })

  }

  getTaskselectList(planId: string){
    this.taskService.getTaskSelectList(planId).subscribe({
      next: (res) => {
        this.taskSelectList = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}

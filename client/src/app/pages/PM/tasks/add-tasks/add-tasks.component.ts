import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { BudgetYearService } from 'src/app/pages/common/budget-year/budget-year.service';
import { SelectList } from 'src/app/pages/common/common';
import { PlanSingleview } from '../../plans/plans';
import { ProgramService } from '../../programs/programs.services';
import { Task, TaskView } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent {

  @Input() task!: TaskView
  toast !: toastPayload;
  taskForm!: FormGroup;
  @Input() plan!: PlanSingleview;  
  

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    
    private taskService:TaskService,
    private commonService: CommonService) { }

  ngOnInit(): void {

    if(this.task){
      this.taskForm = this.formBuilder.group({
        TaskDescription:[this.task.TaskName,Validators.required],
        HasActvity: [this.task.HasActivity, Validators.required],
        PlannedBudget:[this.task.PlannedBudget,[Validators.required,Validators.max(this.plan.RemainingBudget)]]
  
      })
    }
    else{
      this.taskForm = this.formBuilder.group({
        TaskDescription:['',Validators.required],
        HasActvity: [false, Validators.required],
        PlannedBudget:['',[Validators.required,Validators.max(this.plan.RemainingBudget)]]
  
      })
    }

    
  

  }

  submit() {

    if (this.taskForm.valid) {
      if(this.task){
        const taskValue :Task ={
          Id: this.task.Id,
          TaskDescription: this.taskForm.value.TaskDescription,
          HasActvity : this.taskForm.value.HasActvity,
          PlannedBudget:this.taskForm.value.PlannedBudget,
          PlanId : this.plan.Id
        } 
  
  
        this.taskService.editTask(taskValue).subscribe({
          next: (res) => {
            this.toast = {
              message: "Task Successfully Updated",
              title: 'Successfully Updated.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.closeModal()
  
          }, error: (err) => {
  
            console.log (err)
  
            this.toast = {
              message: err.message,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
  
            console.log(err)
          }
        })

      }
      else{
        const taskValue :Task ={
      
          TaskDescription: this.taskForm.value.TaskDescription,
          HasActvity : this.taskForm.value.HasActvity,
          PlannedBudget:this.taskForm.value.PlannedBudget,
          PlanId : this.plan.Id
        } 
  
  
        this.taskService.createTask(taskValue).subscribe({
          next: (res) => {
            this.toast = {
              message: "Task Successfully Creted",
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.closeModal()
  
          }, error: (err) => {
  
            console.log (err)
  
            this.toast = {
              message: err.message,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
  
            console.log(err)
          }
        })

      }

     
    }

  }

  checkBudget(budget:string){

  }

  closeModal() {
    this.activeModal.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetYear, ProgramBudgetYear } from '../common';
import { AddBudgetyearComponent } from './add-budgetyear/add-budgetyear.component';
import { AddProgrambudgetyearComponent } from './add-programbudgetyear/add-programbudgetyear.component';
import { BudgetYearService } from './budget-year.service';
import { ProgramByDetailsComponent } from './program-by-details/program-by-details.component';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-budget-year',
  templateUrl: './budget-year.component.html',
  styleUrls: ['./budget-year.component.css']
})
export class BudgetYearComponent implements OnInit {

  user!: UserView
  programBudgetYear: ProgramBudgetYear[] = [];
  programBudget!: ProgramBudgetYear;

  budgetYears: BudgetYear[] = [];

  constructor(
    private budgetYearService: BudgetYearService, 
    private modalService: NgbModal, 
    private userService: UserService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService
  ){}


  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.programBudgetYearList(this.user.SubOrgId);
  }

  programBudgetYearList(subOrgId: string) {
    this.budgetYearService.getProgramBudgetYear(subOrgId).subscribe({
      next: (res) => {
        this.programBudgetYear = res


      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  addProgramBudgetYear() {

    let modalref = this.modalService.open(AddProgrambudgetyearComponent,{size:'lg',backdrop:'static'})

    modalref.result.then((isConfirmed) => {
      this.programBudgetYearList(this.user.SubOrgId)
    })

  }

  budgetYearsDetails(value:ProgramBudgetYear){
    
    let modalRef = this.modalService.open(ProgramByDetailsComponent,{size:'lg',backdrop:"static"})
    modalRef.componentInstance.programBudget= value;
    modalRef.result.then((isConfirmed)=>{
    this.programBudgetYearList(this.user.SubOrgId)
    })

  }


  UpdateProjectBudgetYear(pby: ProgramBudgetYear){
    let modalRef = this.modalService.open(AddProgrambudgetyearComponent,{size:"lg",backdrop:"static"})
    modalRef.componentInstance.programBudgetYear = pby;
    modalRef.result.then((isConfirmed) => {
      this.programBudgetYearList(this.user.SubOrgId)
    })
    
  }
  DeleteProjectBudgetYear(pbyId: string){
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this CaseType?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.budgetYearService.DeleteProgramBudgetYear(pbyId).subscribe({
          next: (res) => {

              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Case Type successfully Deleted' });
              this.programBudgetYearList(this.user.SubOrgId)

          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
  } 

}



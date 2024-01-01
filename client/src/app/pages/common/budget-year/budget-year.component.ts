import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetYear, ProgramBudgetYear } from '../common';
import { AddBudgetyearComponent } from './add-budgetyear/add-budgetyear.component';
import { AddProgrambudgetyearComponent } from './add-programbudgetyear/add-programbudgetyear.component';
import { BudgetYearService } from './budget-year.service';
import { ProgramByDetailsComponent } from './program-by-details/program-by-details.component';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';

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

  constructor(private budgetYearService: BudgetYearService, private modalService: NgbModal, private userService: UserService) { }


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
}

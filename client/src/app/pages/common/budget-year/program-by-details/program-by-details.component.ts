import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetYear, ProgramBudgetYear } from '../../common';
import { AddBudgetyearComponent } from '../add-budgetyear/add-budgetyear.component';
import { BudgetYearService } from '../budget-year.service';

@Component({
  selector: 'app-program-by-details',
  templateUrl: './program-by-details.component.html',
  styleUrls: ['./program-by-details.component.css']
})
export class ProgramByDetailsComponent implements OnInit {
  @Input() programBudget !: ProgramBudgetYear
  @Output() result: boolean = false
  budgetYears: BudgetYear[] = [];

  constructor(
    private modalService: NgbModal,
    private budgetYearService: BudgetYearService,
    private activeModal: NgbActiveModal) {


  }
  ngOnInit(): void {

    this.getBudgetYears();
  }
  addBudgetYear() {

    let modalref = this.modalService.open(AddBudgetyearComponent, { size: 'lg', backdrop: "static" })
    modalref.componentInstance.programBudget=this.programBudget
    modalref.result.then((isConfirmed) => {
    this.getBudgetYears()
    })
  }

  getBudgetYears() {


    this.budgetYearService.getBudgetYear(this.programBudget?.Id).subscribe({
      next: (res) => {
        this.budgetYears = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  modalClose() {
    this.activeModal.close()
  }

}

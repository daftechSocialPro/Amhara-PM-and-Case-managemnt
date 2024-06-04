import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetYear, ProgramBudgetYear } from '../../common';
import { AddBudgetyearComponent } from '../add-budgetyear/add-budgetyear.component';
import { BudgetYearService } from '../budget-year.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

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
    private activeModal: NgbActiveModal,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
  public translate: TranslateService) {


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

  UpdateBudgetYear(by: BudgetYear){
    let modalref = this.modalService.open(AddBudgetyearComponent, { size: 'lg', backdrop: "static" })
    modalref.componentInstance.programBudget=this.programBudget
    modalref.componentInstance.budgetYear = by
    modalref.result.then((isConfirmed) => {
    this.getBudgetYears()
    })

  }
  DeleteBudgetYear(byId: string){
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this CaseType?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.budgetYearService.DeleteBudgetYear(byId).subscribe({
          next: (res) => {

              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Case Type successfully Deleted' });
              this.getBudgetYears()

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
  getBudgetYears() {

    this.budgetYearService.getBudgetYear(this.programBudget?.Id!).subscribe({
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

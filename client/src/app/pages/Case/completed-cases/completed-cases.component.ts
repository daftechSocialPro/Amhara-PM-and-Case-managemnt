import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArchiveCaseActionComponent } from '../archivecase/archive-case-action/archive-case-action.component';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';

@Component({
  selector: 'app-completed-cases',
  templateUrl: './completed-cases.component.html',
  styleUrls: ['./completed-cases.component.css']
})
export class CompletedCasesComponent implements OnInit {
  completedCases!: ICaseView[]

  constructor(private caseService: CaseService,private modalService:NgbModal) { }
  ngOnInit(): void {
    this.getCompletedCases()
  }

  getCompletedCases() {

    this.caseService.getCompletedCases().subscribe({
      next: (res) => {
        this.completedCases = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  
  archiveCase (cases : ICaseView ){

    let modalRef = this.modalService.open(ArchiveCaseActionComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.case = cases



  }
}

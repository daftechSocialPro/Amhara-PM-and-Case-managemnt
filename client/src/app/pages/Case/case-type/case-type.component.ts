import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CaseService } from '../case.service';
import { AddCaseChildComponent } from './add-case-child/add-case-child.component';
import { AddCaseTypeComponent } from './add-case-type/add-case-type.component';
import { CaseTypeView } from './casetype';
@Component({
  selector: 'app-case-type',
  templateUrl: './case-type.component.html',
  styleUrls: ['./case-type.component.css']
})
export class CaseTypeComponent implements OnInit {

  caseTypes!: CaseTypeView[]

  constructor(private modalService: NgbModal, private caseService: CaseService) { }

  ngOnInit(): void {
    this.getCaseTypes()
  }
  getCaseTypes() {
    this.caseService.getCaseType().subscribe({
      next: (res) => {
        this.caseTypes = res
        console.log('res', res)

      }, error: (err) => {

        console.log(err)
      }
    })

  }
  addCaseType() {
    let modalRef = this.modalService.open(AddCaseTypeComponent, { size: 'lg', backdrop: 'static' })

    modalRef.result.then(() => {
      this.getCaseTypes()
    })

  }

  AddChild(CaseType:CaseTypeView){

    let modalRef = this.modalService.open(AddCaseChildComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.CaseType = CaseType

    modalRef.result.then(()=>{
      this.getCaseTypes()
    })
  }

}

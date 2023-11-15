import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { CaseService } from '../case.service';
import { AddCaseComponent } from './add-case/add-case.component';
import { ICaseView } from './Icase';
import { AssignCaseComponent } from './assign-case/assign-case.component';
import { RaiseIssueComponent } from './raise-issue/raise-issue.component';
import { UpdateCaseComponent } from './update-case/update-case.component';

@Component({
  selector: 'app-encode-case',
  templateUrl: './encode-case.component.html',
  styleUrls: ['./encode-case.component.css']
})
export class EncodeCaseComponent implements OnInit {

  encodedCases!: ICaseView[]
  user!: UserView
  p: number = 1; 
  constructor(private modalService: NgbModal, private caseService: CaseService, private userService: UserService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getEnocdedCases()
  }

  getEnocdedCases() {
    this.caseService.getEncodedCases(this.user.UserID).subscribe({
      next: (res) => {
        this.encodedCases = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  addCase() {
    let modalRef = this.modalService.open(AddCaseComponent, { size: 'xl', backdrop: 'static' })
    modalRef.result.then(()=>{
      this.getEnocdedCases()
    })
  }

  assignCase(caseId : string){
    let modalRef = this.modalService.open(AssignCaseComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.caseId = caseId
    modalRef.result.then(()=>{
      this.getEnocdedCases()
    })
  }

  updateCase(caseId : string ){

    let modalRef = this.modalService.open(UpdateCaseComponent,{size:'xl', backdrop:'static'});
    modalRef.componentInstance.caseId = caseId
    modalRef.result.then(()=>{
      this.getEnocdedCases()
    })
  }

  


}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArchiveCaseActionComponent } from '../archivecase/archive-case-action/archive-case-action.component';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';

@Component({
  selector: 'app-completed-cases',
  templateUrl: './completed-cases.component.html',
  styleUrls: ['./completed-cases.component.css']
})
export class CompletedCasesComponent implements OnInit {
  completedCases!: ICaseView[]
  user! : UserView

  constructor(private caseService: CaseService,private modalService:NgbModal, private userService: UserService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getCompletedCases()
  }

  getCompletedCases() {

    this.caseService.getCompletedCases(this.user.SubOrgId).subscribe({
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

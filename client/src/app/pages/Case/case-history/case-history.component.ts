import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';

@Component({
  selector: 'app-case-history',
  templateUrl: './case-history.component.html',
  styleUrls: ['./case-history.component.css']
})
export class CaseHistoryComponent implements OnInit {

  caseHistoryId!: string
  user!: UserView
  caseHistories!: ICaseView[]
  caseTypeTitle : string = ""
  CaseNumber:string=""

  constructor(private caseService: CaseService, private userService: UserService,private router : ActivatedRoute) { }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.caseHistoryId = this.router.snapshot.paramMap.get('caseHistoryId')!
    this.getHistories()

 
  }

  getHistories() {

    this.caseService.GetCaseHistories(
     this.user.EmployeeId,
     this.caseHistoryId
    ).subscribe({
      next: (res) => {
       this.caseHistories = res 
       this.caseTypeTitle = this.caseHistories[0]?.CaseTypeName
       this.CaseNumber = this.caseHistories[0]?.CaseNumber
      }, error: (err) => {
        console.error(err)
      }
    })

  }



}








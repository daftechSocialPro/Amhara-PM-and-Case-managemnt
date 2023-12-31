import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';

@Component({
  selector: 'app-archivecase',
  templateUrl: './archivecase.component.html',
  styleUrls: ['./archivecase.component.css']
})
export class ArchivecaseComponent implements OnInit {

  user!:UserView
  ArchivedCases!: ICaseView[]

  constructor(private caseService : CaseService, private userService:UserService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getArchivedCases()

  }

  getArchivedCases(){

    this.caseService.getArchiveCases(this.user.SubOrgId).subscribe({
      next:(res)=>{

        this.ArchivedCases = res 
      },error:(err)=>{

        console.error(err)
      }
    })
  }



}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { TranslateService } from '@ngx-translate/core';
import { FileViewComponent } from './file-view/file-view.component';

@Component({
  selector: 'app-archivecase',
  templateUrl: './archivecase.component.html',
  styleUrls: ['./archivecase.component.css']
})
export class ArchivecaseComponent implements OnInit {

  user!:UserView
  ArchivedCases!: ICaseView[]

  constructor(private caseService : CaseService,
     private userService:UserService,
     public  translate: TranslateService) { }
  constructor(
    private caseService : CaseService, 
    private userService:UserService,
    private modalService:NgbModal,
  ) { }
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

  viewFiles(id: string){
    let modalRef = this.modalService.open(FileViewComponent, {backdrop: "static", size: "lg"})
    modalRef.componentInstance.files = this.ArchivedCases.find(x => x.Id === id)?.Attachments
    modalRef.result.then((res) => {
      this.getArchivedCases()
    })
  }


}

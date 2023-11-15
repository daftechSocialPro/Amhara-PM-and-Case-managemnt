import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';

@Component({
  selector: 'app-archivecase',
  templateUrl: './archivecase.component.html',
  styleUrls: ['./archivecase.component.css']
})
export class ArchivecaseComponent implements OnInit {

  ArchivedCases!: ICaseView[]

  constructor(private caseService : CaseService) { }
  ngOnInit(): void {
    
    this.getArchivedCases()

  }

  getArchivedCases(){

    this.caseService.getArchiveCases().subscribe({
      next:(res)=>{

        this.ArchivedCases = res 
      },error:(err)=>{

        console.error(err)
      }
    })
  }



}

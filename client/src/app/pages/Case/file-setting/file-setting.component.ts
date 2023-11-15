import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSettingView } from '../case-type/casetype';
import { CaseService } from '../case.service';

import { AddFileSettingComponent } from './add-file-setting/add-file-setting.component';

@Component({
  selector: 'app-file-setting',
  templateUrl: './file-setting.component.html',
  styleUrls: ['./file-setting.component.css']
})
export class FileSettingComponent implements OnInit {


  fileSettings!: FileSettingView[]

  constructor(private modalService: NgbModal, private caseService: CaseService) { }
  ngOnInit(): void {
   this.getFileSettingList()
  }

  getFileSettingList() {

    this.caseService.getFileSetting().subscribe({
      next: (res) => {
        this.fileSettings = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  addfilesetting() {
    let modalRef = this.modalService.open(AddFileSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(()=>
    this.getFileSettingList())
  }

}

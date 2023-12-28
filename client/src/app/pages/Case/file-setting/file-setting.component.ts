import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSettingView } from '../case-type/casetype';
import { CaseService } from '../case.service';

import { AddFileSettingComponent } from './add-file-setting/add-file-setting.component';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';

@Component({
  selector: 'app-file-setting',
  templateUrl: './file-setting.component.html',
  styleUrls: ['./file-setting.component.css']
})
export class FileSettingComponent implements OnInit {

  user!:UserView
  fileSettings!: FileSettingView[]

  constructor(private modalService: NgbModal, private caseService: CaseService, private userService: UserService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
   this.getFileSettingList()
  }

  getFileSettingList() {

    this.caseService.getFileSetting(this.user.SubOrgId).subscribe({
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

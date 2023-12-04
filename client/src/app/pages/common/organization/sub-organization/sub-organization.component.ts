import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSubOrgComponent } from './add-sub-org/add-sub-org.component';

@Component({
  selector: 'app-sub-organization',
  templateUrl: './sub-organization.component.html',
  styleUrls: ['./sub-organization.component.css']
})
export class SubOrganizationComponent implements OnInit {
  user!:UserView
  subOrgs:any

  constructor(
    private orgService : OrganizationService,
    private userService: UserService,
    private modalService: NgbModal,

  ){}
  ngOnInit(): void {
      
    this.getSubOrgs()

  }

  getSubOrgs(){
    this.orgService.GetSubOrgs().subscribe({
      next: (res) => {
        this.subOrgs = res
        console.log('this.subOrgs: ', this.subOrgs);

      }, error: (err) => {
        console.error(err)
      }
    })
  }

  addModal() {
    let modalRef = this.modalService.open(AddSubOrgComponent, { size: 'xl', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getSubOrgs()
    })
  }

}

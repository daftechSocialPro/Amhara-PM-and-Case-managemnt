import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSubOrgComponent } from './add-sub-org/add-sub-org.component';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';


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
    private messageService:MessageService,
    private confirmationService:ConfirmationService,

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

  UpdateSubOrg(subOrg:any) {

    let modalRef = this.modalService.open(AddSubOrgComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.subOrg = subOrg
    
    modalRef.result.then(()=>{
      this.getSubOrgs()
    })

  }





  DeleteSubOrg(subOrgId : string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Subisdiary Organization?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.orgService.deleteSubOrg(subOrgId).subscribe({
          next: (res) => {

              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Case Type successfully Deleted' });
              this.getSubOrgs()

          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
  } 
  
}

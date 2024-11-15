import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';
import { UserService } from '../../pages-login/user.service';
import { Employee } from '../organization/employee/employee';
import { AddUsersComponent } from './add-users/add-users.component';
import { UserView } from '../../pages-login/user';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  user!: UserView
  employees: Employee[] = []
  filterdEmployees : Employee[]=[]
  searchBY!:string 
  constructor(private modalService: NgbModal, 
    private userService: UserService,
     private commonService : CommonService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  public translate: TranslateService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

    this.getUsers()
  }

getUsers(){
  this.userService.getSystemUsers(this.user.SubOrgId).subscribe({
    next: (res) => {
      this.employees = res
      this.filterdEmployees = res
      console.log("this.filterdEmployees",this.employees)
    }, error: (err) => {
      console.error(err)
    }
  })
}
  addModal() {
    let modalRef = this.modalService.open(AddUsersComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then((res) => {
      this.getUsers()
    })

  }

  manageRoles(userId: string){
    let modalRef= this.modalService.open(ManageRolesComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.userId = userId
    modalRef.result.then(()=>{this.getUsers()})
  }
  changePassword(user: any){
    let modalRef= this.modalService.open(EditUserComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.user1 = user
    modalRef.result.then(()=>{this.getUsers()})
  }
  getPath(value:string){
    return this.commonService.createImgPath(value)
  }

  Filter(value:string){

    const searchTerm = value.toLowerCase()


    this.filterdEmployees = this.employees.filter((item)=> {
    return (
         item.FullName.toLowerCase().includes(searchTerm) ||
         item.PhoneNumber.toLowerCase().includes(searchTerm) ||
         item.StructureName.toLowerCase().includes(searchTerm)
        )
    }


    )


  }

  deleteUser(userId: string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this USer?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: (res) => {

            if (res.Success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.Message });
              this.getUsers()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.Message });
            }
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

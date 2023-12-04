import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';
import { UserService } from '../../pages-login/user.service';
import { Employee } from '../organization/employee/employee';
import { AddUsersComponent } from './add-users/add-users.component';
import { UserView } from '../../pages-login/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  user!: UserView
  employees: Employee[] = []
  constructor(private modalService: NgbModal, private userService: UserService, private commonService : CommonService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

 this.getUsers()
  }

getUsers(){
  this.userService.getSystemUsers(this.user.SubOrgId).subscribe({
    next: (res) => {
      this.employees = res
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

  getPath(value:string){
    return this.commonService.createImgPath(value)
  }

}

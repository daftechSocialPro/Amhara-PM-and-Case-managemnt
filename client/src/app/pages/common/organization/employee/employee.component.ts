import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CommonService } from 'src/app/common/common.service';

import { OrganizationService } from '../organization.service';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { Employee } from './employee';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  user!: UserView
  employees: Employee[] = []
  filterdEmployees:Employee[]=[]

  constructor(private orgService: OrganizationService, private commonServcie: CommonService, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.listEmployees()

  }

  listEmployees() {
    
    this.orgService.getEmployees(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.employees = res
        this.filterdEmployees = res
        console.log("employees", this.employees)
      }, error: (err) => {
        console.error(err)
      }
    })
  }



  getPath(photo: string) {

    return this.commonServcie.createImgPath(photo)
  }

  updateEmp(emp: any) {

    let modalRef = this.modalService.open(UpdateEmployeeComponent, { size: "xl", backdrop: 'static' })
    modalRef.componentInstance.emp = emp;   
    modalRef.result.then(() => {
      this.listEmployees()
    })

  }

  addModal() {
    let modalRef = this.modalService.open(AddEmployeesComponent, { size: 'xl', backdrop: 'static' })
    modalRef.result.then(() => {
      this.listEmployees()
    })
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

}



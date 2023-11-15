import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { SelectList } from '../../common';
import { Employee } from '../../organization/employee/employee';
import { OrganizationService } from '../../organization/organization.service';
import { UserManagment } from '../user-managment';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {


  @Output() result = new EventEmitter<boolean>();

  toast !: toastPayload;
  userForm!: FormGroup;

  employeeList: SelectList[] = [];
  RoleList: SelectList[] = [];
  employee !: SelectList;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      Roles: [[], Validators.required]

    });

    this.getRoles();
    this.getEmployees();
  }


  getRoles() {

    this.userService.getRoles().subscribe({
      next: (res) => {
        this.RoleList = res
      },
      error: (err) => {
        console.error(err)
      }
    })

  }
  getEmployees() {

    this.orgService.getEmployeeNoUserSelectList().subscribe({
      next: (res) => {
        this.employeeList = res
      }
      , error: (err) => {
        console.error(err)
      }
    })

  }

  submit() {

    if (this.userForm.valid && this.employee != null) {
      if (this.userForm.value.Password === this.userForm.value.ConfirmPassword) {
        let user: UserManagment = {
          FullName: this.employee.Name,
          EmployeeId: this.employee.Id,
          Password: this.userForm.value.Password,
          UserName: this.userForm.value.UserName,
          Roles: this.userForm.value.Roles
        }
        this.userService.createUser(user).subscribe({
          next: (res) => {
            this.toast = {
              message: 'User Created Successfully',
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.closeModal();
          }
          , error: (err) => console.error(err)
        })


      }
      else {
        this.toast = {
          message: 'Password an Confirm Password doesnt match',
          title: 'Password Error.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
      }
    }
    else {
      this.toast = {
        message: 'Please chek your form',
        title: 'Form Error.',
        type: 'Error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);
    }

  }
  closeModal() {
    this.activeModal.close()
  }

  selectEmployee(event: SelectList) {
    this.employee = event
  }


}

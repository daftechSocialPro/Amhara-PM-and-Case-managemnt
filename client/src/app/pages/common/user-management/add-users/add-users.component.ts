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
import { UserView } from 'src/app/pages/pages-login/user';
import { TranslateService } from '@ngx-translate/core';
import { KebeleDto } from '../../organization/kebele/kebele.model';
import { WoredaDto } from '../../organization/woreda/woreda.dto';
import { ZoneDto } from '../../organization/zone/zone.model';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {


  @Output() result = new EventEmitter<boolean>();

  toast !: toastPayload;
  userForm!: FormGroup;
  user!: UserView
  employeeList: SelectList[] = [];
  RoleList: SelectList[] = [];
  employee !: SelectList;
  zones: ZoneDto[] = [];
  woredas: WoredaDto[] = [];
  kebeles: KebeleDto[] = [];
  constructor(private userService: UserService,
     private formBuilder: FormBuilder,
      private orgService: OrganizationService, 
      private commonService: CommonService, 
      private activeModal: NgbActiveModal,
    public translate: TranslateService) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.userForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      Roles: [[], Validators.required],
      ZoneId: [''],  // Optional based on role
  WoredaId: [''],
  KebeleId: ['']

    });

    this.getRoles();
    this.getEmployees();
    this.getZones();
  }
  onRoleChange() {
    const selectedRoles = this.userForm.value.Roles;
    if (selectedRoles.includes('Zone')) {
      this.userForm.get('ZoneId')?.setValidators(Validators.required);
      this.userForm.get('WoredaId')?.clearValidators();
      this.userForm.get('WoredaId')?.setValue(null);
      this.userForm.get('KebeleId')?.clearValidators();
      this.userForm.get('KebeleId')?.setValue(null);
    } else if (selectedRoles.includes('Woreda')) {
      this.userForm.get('ZoneId')?.setValidators(Validators.required);
      this.userForm.get('WoredaId')?.setValidators(Validators.required);
      this.userForm.get('KebeleId')?.clearValidators();
      this.userForm.get('KebeleId')?.setValue(null);
    } else if (selectedRoles.includes('Kebele')) {
      this.userForm.get('ZoneId')?.setValidators(Validators.required);
      this.userForm.get('WoredaId')?.setValidators(Validators.required);
      this.userForm.get('KebeleId')?.setValidators(Validators.required);
    }
    this.userForm.get('ZoneId')?.updateValueAndValidity();
    this.userForm.get('WoredaId')?.updateValueAndValidity();
    this.userForm.get('KebeleId')?.updateValueAndValidity();
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

    this.orgService.getEmployeeNoUserSelectList(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.employeeList = res
      }
      , error: (err) => {
        console.error(err)
      }
    })

  }
  getZones() {
    this.orgService.getZones().subscribe({
      next: (res) => {
        this.zones = res;
      },
      error: (err) => console.error(err)
    });
  }
  
  getWoredas(zoneId: string) {
    this.orgService.getWoredas(zoneId).subscribe({
      next: (res) => {
        this.woredas = res;
      },
      error: (err) => console.error(err)
    });
  }
  
  getKebeles(woredaId: string) {
    this.orgService.getKebeles(woredaId).subscribe({
      next: (res) => {
        this.kebeles = res;
      },
      error: (err) => console.error(err)
    });
  }
  onZoneChange(event: any) {
    const zoneId = event.target.value;
    this.getWoredas(zoneId);
  }
  
  onWoredaChange(event: any) {
    const woredaId = event.target.value;
    this.getKebeles(woredaId);
  }
  
  submit() {

    if (this.userForm.valid && this.employee != null) {
      if (this.userForm.value.Password === this.userForm.value.ConfirmPassword) {
        let user: UserManagment = {
          FullName: this.employee.Name,
          EmployeeId: this.employee.Id,
          Password: this.userForm.value.Password,
          UserName: this.userForm.value.UserName,
          Roles: this.userForm.value.Roles,
          SubsidiaryOrganizationId: this.user.SubOrgId,
          ZoneId: this.userForm.value?.ZoneId === "" ? null : this.userForm.value?.ZoneId,
          WoredaId: this.userForm.value?.WoredaId === "" ? null : this.userForm.value?.WoredaId,
          KebeleId: this.userForm.value?.KebeleId === "" ? null : this.userForm.value?.KebeleId,
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

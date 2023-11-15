import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { ChangePasswordModel, Employee } from '../common/organization/employee/employee';
import { OrganizationService } from '../common/organization/organization.service';
import { UserView } from '../pages-login/user';
import { UserService } from '../pages-login/user.service';
import { AuthGuard } from 'src/app/auth/auth.guard';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  user !: UserView
  Employee!: Employee
  EmployeeForm!: FormGroup
  passwordForm!: FormGroup
  imageURL!: string
  toast !: toastPayload

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private authGuard : AuthGuard,
    private orgServcie: OrganizationService,
    private formBuilder: FormBuilder) { 
      this.EmployeeForm = this.formBuilder.group({
        avatar: [null],
        Title: ['', Validators.required],
        FullName: ['', Validators.required],          
        PhoneNumber: ['', Validators.required],
        Remark: ['']
      })
      this.passwordForm  = this.formBuilder.group({
      
        OldPassowrd: ['', Validators.required],
        NewPassword: ['', Validators.required] ,
        ConfirmPassword: ['', [Validators.required,this.matchValues('NewPassword')]]          
     
      })
  
      
    }

    matchValues(matchTo: string) {
      return (control: AbstractControl) => {
        // Get the value of the control to match against
        const matchingValue = control.parent?.get(matchTo)?.value;
        
        // If the values don't match, set an error on the control
        if (control.value !== matchingValue) {
          return { mismatchedValues: true };
        }
        
        // If the values match, clear any previous errors on the control
        return null;
      };
    }
  

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getEmployee();
    
    
  }
  getEmployee() {

    this.orgServcie.GetEmployeesById(this.user.EmployeeId).subscribe({
      next: (res) => {

        console.log("res",res)
        this.Employee = res
        this.EmployeeForm.controls['Title'].setValue(res.Title)
        this.EmployeeForm.controls['FullName'].setValue(res.FullName)
        this.EmployeeForm.controls['PhoneNumber'].setValue(res.PhoneNumber)
        this.EmployeeForm.controls['Remark'].setValue(res.Remark)
        this.imageURL = this.commonService.createImgPath(res.Photo)
      
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  getImage(value: string) {

    console.log(this.commonService.createImgPath(value))
    return this.commonService.createImgPath(value)
  }


  showPreview(event: any) {
    const file = (event.target).files[0];
    console.log(file)
    this.EmployeeForm.patchValue({
      avatar: file
    });
    this.EmployeeForm.get('avatar')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  submit() {
    console.log(this.Employee)
    if (this.EmployeeForm.valid) {

      var value = this.EmployeeForm.value;
      var file = value.avatar

      const formData = new FormData();
      file ? formData.append('file', file, file.name) : "";

      formData.set('Id', this.Employee.Id)
      formData.set('Photo', this.Employee.Photo)
      formData.set('Title', value.Title);
      formData.set('FullName', value.FullName);
      formData.set('Gender', value.Gender);
      formData.set('PhoneNumber', value.PhoneNumber);
      formData.set('Remark', value.Remark);


      this.orgServcie.employeeUpdate(formData).subscribe({
        next: (res) => {
          this.toast = {
            message: 'Employee Successfully Updated',
            title: 'Successfully Updated.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);


        }, error: (err) => {

          this.toast = {
            message: 'Something went wrong',
            title: 'Network error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          console.error(err)
        }
      })
    }
  }
  submit2(){
    if (this.passwordForm.valid){

      var formData : ChangePasswordModel ={
        UserId : this.user.UserID,
        CurrentPassword : this.passwordForm.value.OldPassowrd,
        NewPassword: this.passwordForm.value.NewPassword
      }
      this.orgServcie.changePassword(formData).subscribe({
        next: (res) => {

          this.toast = {
            message: res,
            title: 'Successfully Updated.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.authGuard.logout()


        }, error: (err) => {

          this.toast = {
            message: err,
            title: 'Network error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          console.error(err)
        }
      })

    }
    console.log(this.passwordForm.value)
  }

}

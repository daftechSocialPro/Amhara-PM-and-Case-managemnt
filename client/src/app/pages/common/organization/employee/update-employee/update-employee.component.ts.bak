import { Component, Input, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
//import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { SelectList } from '../../../common';
import { OrganizationService } from '../../organization.service';
import { Employee } from '../employee';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  toast!: toastPayload;
  branchList: SelectList[] = [];
  parentStructureList: SelectList[] = [];

  @Input() emp !: Employee;


  EmployeeForm !: FormGroup;
  imageURL: string = "";
  user!: UserView


  constructor(private orgService: OrganizationService,
     private formBuilder: FormBuilder, 
     private commonService: CommonService,
      private actvieModal: NgbActiveModal,
       private userService: UserService,
      public translate: TranslateService) {


  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

    console.log("employee",this.emp)
    
    this.getBranchs()
    this.imageURL = this.commonService.createImgPath(this.emp!.Photo)
    this.EmployeeForm = this.formBuilder.group({
      avatar: [null],
      // Photo: [this.emp?.Photo, Validators.required],
      Title: [this.emp?.Title, Validators.required],
      branchId : ['',Validators.required],
      FullName: [this.emp?.FullName, Validators.required],
      Gender: [this.emp?.Gender, Validators.required],
      PhoneNumber: [this.emp?.PhoneNumber, Validators.required],
      Position: [this.emp?.Position, Validators.required],
      StructureId: ['', Validators.required],
      RowStatus: [this.emp?.RowStatus, Validators.required],
      Remark: [this.emp?.Remark]

    })
    

    // this.onBranchChange(this.emp?.BranchId);





  }

  getBranchs(){
    this.orgService.getOrgBranchSelectList(this.user.SubOrgId).subscribe(
      {
        next: (res) => {
          this.branchList = res
          console.log('this.branchList: ', this.branchList);
          const lowerBranhId = this.emp?.BranchId.toLowerCase()
          this.EmployeeForm.controls['branchId'].setValue(lowerBranhId);
          this.onBranchChange(this.emp?.BranchId);

        },
        error: (err) => console.error(err)
      })
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

  onBranchChange(value: string) {

    this.orgService.getOrgStructureSelectList(value).subscribe(
      {
        next: (res) => {
          this.parentStructureList = res
          const lowetStructureId = this.emp?.StructureId.toLowerCase()
          this.EmployeeForm.controls["StructureId"].setValue(lowetStructureId)
          console.log(this.parentStructureList)
        },
        error: (err) => console.error(err)

      })
  }

  submit() {




    if (this.EmployeeForm.valid) {
      
      var value = this.EmployeeForm.value;
      var file = value.avatar



      // if (files.length === 0)
      //   return;
      // let fileToUpload = <File>files[0];
      const formData = new FormData();
      file ? formData.append('file', file, file.name) : "";
      
      formData.set('Id', this.emp.Id)
      formData.set('Photo',this.emp.Photo)
      formData.set('Title', value.Title);
      formData.set('FullName', value.FullName);
      formData.set('Gender', value.Gender);
      formData.set('PhoneNumber', value.PhoneNumber);
      formData.set('Position', value.Position);
      formData.set('StructureId', value.StructureId);
      formData.set('Remark', value.Remark);
      formData.set('RowStatus', value.RowStatus);
      
      this.orgService.employeeUpdate(formData).subscribe({
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
          this.closeModal();

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

  closeModal() {
    this.actvieModal.close()
  }

}

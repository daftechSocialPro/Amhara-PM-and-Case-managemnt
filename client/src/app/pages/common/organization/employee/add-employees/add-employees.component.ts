import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
//import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from '../../../common';
import { OrganizationService } from '../../organization.service';



@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  toast!: toastPayload;
  branchList: SelectList[] = [];
  parentStructureList: SelectList[] = [];


  EmployeeForm !: FormGroup;
  imageURL: string = "";


  constructor(private orgService: OrganizationService, private formBuilder: FormBuilder, private commonService: CommonService, private activeModal: NgbActiveModal) {

    this.EmployeeForm = this.formBuilder.group({
      avatar: [null],

      // Photo: [null, Validators.required],
      Title: [null, Validators.required],
      FullName: [null, Validators.required],
      Gender: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      Position: [null, Validators.required],
      StructureId: [null, Validators.required],
      Remark: ['']

    })



  }

  ngOnInit(): void {
    this.orgService.getOrgBranchSelectList().subscribe(
      {
        next: (res) => this.branchList = res,
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
        next: (res) => this.parentStructureList = res,
        error: (err) => console.error(err)

      })
  }

  submit() {


    if (this.imageURL == "") {
      this.toast = {
        message: 'Image File not Selected',
        title: 'Upload Error .',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);
      return ;

    }

    if (this.EmployeeForm.valid) {

      var value = this.EmployeeForm.value;
      var file = value.avatar



      // if (files.length === 0)
      //   return;
      // let fileToUpload = <File>files[0];
      const formData = new FormData();
      file ? formData.append('file', file, file.name) : "";

      formData.set('Title', value.Title);
      formData.set('FullName', value.FullName);
      formData.set('Gender', value.Gender);
      formData.set('PhoneNumber', value.PhoneNumber);
      formData.set('Position', value.Position);
      formData.set('StructureId', value.StructureId);
      formData.set('Remark', value.Remark);


      this.orgService.employeeCreate(formData).subscribe({
        next: (res) => {
          this.toast = {
            message: 'Employee Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal()

        }, error: (err) => {

          this.toast = {
            message: 'Something went wrong',
            title: 'Network Error.',
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
    this.activeModal.close()
  }
}



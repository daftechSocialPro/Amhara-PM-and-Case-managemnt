import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {

  toast !: toastPayload;
  profileForm !: FormGroup;
  imageURL: string = "";

  public message: string = '';
  public progress: number = 0;

  constructor(private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService) {


    this.profileForm = this.formBuilder.group({

      id: [null],
      logo: [''],
      avatar: [null],
      organizationNameEnglish: ['123'],
      organizationNameInLocalLanguage: [''],
      address: [''],
      phoneNumber: [''],
      remark: [''],
      smscode: [''],
      password: [''],
      username: ['']
    })
  }

  ngOnInit(): void {

    this.orgService.getOrganizationalProfile().subscribe({
      next: (res) => {

        if (res != null) {
          this.imageURL = this.commonService.createImgPath(res.Logo)
          this.profileForm = this.formBuilder.group({
            id: res.Id,
            logo: res.Logo,
            avatar: [null],
            organizationNameEnglish: res.OrganizationNameEnglish,
            organizationNameInLocalLanguage: res.OrganizationNameInLocalLanguage,
            address: res.Address,
            phoneNumber: res.PhoneNumber,
            remark: res.Remark,
            smscode: res.SmsCode,
            password: res.Password,
            username: res.UserName
          })
        }
      }


    })
  }


  // Image Preview
  showPreview(event: any) {
    const file = (event.target).files[0];
    console.log(file)
    this.profileForm.patchValue({
      avatar: file
    });
    this.profileForm.get('avatar')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  // Submit Form
  submit() {



    if (this.profileForm.value) {

      var value = this.profileForm.value;
      var file = value.avatar;

      // if (files.length === 0)
      //   return;
      // let fileToUpload = <File>files[0];
      const formData = new FormData();
      file ? formData.append('file', file, file.name) : "";

      formData.set('logo', value.logo);
      formData.set('organizationNameEnglish', value.organizationNameEnglish);
      formData.set('organizationNameInLocalLanguage', value.organizationNameInLocalLanguage);
      formData.set('address', value.address);
      formData.set('phoneNumber', value.phoneNumber);
      formData.set('remark', value.remark);
      formData.set('SmsCode', value.smscode);
      formData.set('Password', value.password);
      formData.set('UserName', value.username)




      this.orgService.OrganizationCreate(formData)
        .subscribe(
          {
            next: (event: any) => {
              this.toast = {
                message: 'Organizational Profile Successfully Created',
                title: 'Successfully Created.',
                type: 'success',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast);
            },
            error: (err) => {
              this.toast = {
                message: err,
                title: 'Something went Wrong.',
                type: 'error',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast);
            }
          })

    }
    else {
      this.toast = {
        message: 'Check your input',
        title: 'Something went Wrong.',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);
    }

  }

  update() {


    if (this.profileForm.valid) {
      var value = this.profileForm.value;
      var file = value.avatar;

      // if (files.length === 0)
      //   return;
      // let fileToUpload = <File>files[0];
      const formData = new FormData();
      file ? formData.append('file', file, file.name) : "";
      formData.set('Id', value.id);
      formData.set('logo', value.logo);
      formData.set('organizationNameEnglish', value.organizationNameEnglish);
      formData.set('organizationNameInLocalLanguage', value.organizationNameInLocalLanguage);
      formData.set('address', value.address);
      formData.set('phoneNumber', value.phoneNumber);
      formData.set('remark', value.remark);
      formData.set('SmsCode', value.smscode);
      formData.set('Password', value.password);
      formData.set('UserName', value.username)

      this.orgService.OrganizationUpdate(formData).subscribe({
        next: (res) => {

          this.toast = {
            message: 'Organizational Profile Successfully Updated',
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
            message: err,
            title: 'Something went Wrong.',
            type: 'error',
       
            ic: {
              timeOut: 2500,
              
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

        }
      })
    }
    else {
      this.toast = {
        message: 'Check your input',
        title: 'Something went Wrong.',
        type: 'error',
        ic: {
          timeOut: 2500,
          closeButton: true,
        } as IndividualConfig,
      };
      this.commonService.showToast(this.toast);
    }

  }




}

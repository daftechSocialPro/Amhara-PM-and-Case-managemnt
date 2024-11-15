import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'jquery';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user!: UserView
  @Input() user1: any
  showFields: boolean = false;
  toast !: toastPayload;
  
  editUserForm!: FormGroup
  statusDropdownItems = [
    { name: 'ACTIVE', code: 'Active' },
    { name: 'INACTIVE', code: 'Inactive' },
  ]
  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private commonService: CommonService, 
    ){}
    
    ngOnInit(): void {
      console.log("userEdit",this.user1)
      this.user = this.userService.getCurrentUser()
      this.editUserForm = this.formBuilder.group({
        Username: [null, Validators.required],
        UserStatus: [null, Validators.required],
        NewPassword: [null],
        ConfirmPassword: [null],
      })
      
      this.editUserForm.controls['Username'].setValue(this.user1.UserName)
      this.editUserForm.controls['UserStatus'].setValue(this.user1.Status)
      
    }
    
    onSubmit(){
      debugger
      if (this.editUserForm.valid) {
        var userData:any = {
          userId: this.user1.Id,
          userName:this.editUserForm.value.Username,
          rowStatus:this.editUserForm.value.UserStatus,
          changePassword : null
        }
        
        
        if (this.editUserForm.value.NewPassword !== null && (this.editUserForm.value.NewPassword === this.editUserForm.value.ConfirmPassword))
        {
          userData.changePassword = this.editUserForm.value.NewPassword
        }
        else if(this.editUserForm.value.NewPassword !== this.editUserForm.value.ConfirmPassword){
          
          this.toast = {
            message: 'New Password and Confirm Password does not match',
            title: 'Form Submit failed.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          
        }
        
        
        this.userService.updateUser(userData).subscribe({
          next: (res) => {
            if(res.Success){
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
              
              this.editUserForm.reset();
              this.closeModal();
            }
            else {
              this.toast = {
                message: res.Message,
                title: 'Error',
                type: 'error',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast);
            }
            
          }, error: (err) => console.error(err)
        })
      }
    }
    
    closeModal()
    {
      this.activeModal.close()
    }
  }
  
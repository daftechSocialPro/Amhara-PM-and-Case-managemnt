import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserService } from 'src/app/pages/pages-login/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input() userId!: string
  PasswordForm!: FormGroup;
  toast!: toastPayload;
  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr:CommonService
     ){}
    
    ngOnInit(): void {
      this.PasswordForm = this.formBuilder.group({
        // CurrentPassword: [null, Validators.required],
        NewPassword: [null, Validators.required],
        ConfirmPassword: [null, Validators.required]
      },)
    }
    
    onSubmit(){
      if (this.PasswordForm.valid) {
        if(this.PasswordForm.value.NewPassword !== this.PasswordForm.value.ConfirmPassword)
        {
          this.toast = {
            message: 'New Password and Confirm Password does not match',
            title: 'Form Submit failed.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.toastr.showToast(this.toast);
        }
        else {
          
            var changePassword:any ={
              userId:this.userId,
              //currentPassword:this.PasswordForm.value.CurrentPassword,
              newPassword:this.PasswordForm.value.NewPassword,
              
            }
            
            
            
            this.userService.changePasswordAdmin(changePassword).subscribe({
              next: (res) => {
               
                
                this.toast = {
                  message: 'Password Changed',
                  title: 'Successful',
                  type: 'success',
                  ic: {
                    timeOut: 2500,
                    closeButton: true,
                  } as IndividualConfig,
                };
                this.toastr.showToast(this.toast);
                this.PasswordForm.reset();
                this.closeModal();
                                
              }, error: (err) => {
                this.toast = {
                  message: err,
                  title: 'Form Submit failed.',
                  type: 'error',
                  ic: {
                    timeOut: 2500,
                    closeButton: true,
                  } as IndividualConfig,
                };
                this.toastr.showToast(this.toast);
              }
            })
            
            
            
          }
        
      }
      else {
        
        this.toast = {
          message: 'Please fil required inputs !!',
          title: 'Form Submit failed.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.toastr.showToast(this.toast);
      }
    }
    closeModal()
    {
      this.activeModal.close()
    }

}

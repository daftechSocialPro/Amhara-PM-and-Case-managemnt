import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserService } from 'src/app/pages/pages-login/user.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit{

  @Input() userId!: string
  
  sourceRoles: any[] = [];
  targetRoles: any[] = [];
  teamId: any;
  toast!: toastPayload;
  
  constructor(
    private commonService: CommonService,
    
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private toastr:CommonService
    ) { }
    
    ngOnInit(): void {
      this.getUsersNotRoles()
      this.getUsersRoles()
      
    }
    
    getUsersRoles() {
      this.userService.getAssignedRoles(this.userId).subscribe({
        next: (res) => {
          this.sourceRoles = res.map(item => ({ value: item.Name, label: item.Name }));
          
        }
      })
    }
    getUsersNotRoles() {
      this.userService.getNotAssignedRoles(this.userId).subscribe({
        next: (res) => {
          this.targetRoles = res.map(item => ({ value: item.Name, label: item.Name }));
          
        }
      })
    }
    
    revokeRole(event:any)
    {
      const selectedRoles = event.items.map((u: { value: any }) => u.value);
      selectedRoles.forEach((role:{value: any}) => {
        const data ={userId:this.userId , roleName:role}
        this.userService.revokeRole(data).subscribe({
          next: (res) => {
            
            
            this.toast = {
              message: 'Succesfully Revoked Roles',
              title: 'Successful',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.toastr.showToast(this.toast);
            // else{
            //   this.messageService.add({
            //     severity: 'error',
            //     summary: 'Something went wrong!!',
            //     detail: res.message
            //   });
            
            // }
            
          },
          error: (err) => {
            this.toast = {
              message: 'Something went wrong'+ err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
          }
        })
        
      });
      
    }
    
    assignRole(event:any)
    {
      const selectedRoles = event.items.map((u: { value: any }) => u.value);
      selectedRoles.forEach((role:{value: any}) => {
        const data ={userId:this.userId , roleName:role}
        this.userService.assignRole(data).subscribe({
          next: (res) => {
            
            
            
            this.toast = {
              message: 'Succesfully Assigned Roles',
              title: 'Successful',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.toastr.showToast(this.toast);
            
            // else{
            //   this.messageService.add({
            //     severity: 'error',
            //     summary: 'Something went wrong!!',
            //     detail: res.message
            //   });
            
            // }
            
          },
          error: (err) => {
            this.toast = {
              message: 'Something went wrong'+ err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
          }
        })
        
      });
      
    }
    
    closeModal()
    {
      this.activeModal.close()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../pm.services';
import { ComiteeAdd } from '../committee';

@Component({
  selector: 'app-add-comitee',
  templateUrl: './add-comitee.component.html',
  styleUrls: ['./add-comitee.component.css']
})
export class AddComiteeComponent implements OnInit {

  comiteeeForm!: FormGroup;
  user!: UserView;
  
  
  toast!: toastPayload;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    
    private commonService: CommonService
  ) {

    this.comiteeeForm = this.formBuilder.group({
      CommitteeName: ['', Validators.required],
      Remark: [''],

    })

  }


  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.comiteeeForm.valid) {



      let comitee: ComiteeAdd = {
        Name: this.comiteeeForm.value.CommitteeName,
        Remark: this.comiteeeForm.value.Remark,
        CreatedBy: this.user.UserID
      }

      this.pmService.createComittee(comitee).subscribe({
        next: (res) => {
          this.toast = {
            message: ' Committee Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal()

        },
        error: (err) => {


          this.toast = {
            message: err.message,
            title: 'Something Went Wrong.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast)


        }
      })


    }



  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { PMService } from '../../pm.services';
import { ComiteeAdd, CommitteeView } from '../committee';

@Component({
  selector: 'app-update-cpmmittee',
  templateUrl: './update-cpmmittee.component.html',
  styleUrls: ['./update-cpmmittee.component.css']
})
export class UpdateCpmmitteeComponent implements OnInit {

  @Input() comitee!:CommitteeView;
  updateComiteeForm!: FormGroup;

  toast!:toastPayload;
  

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private pmService : PMService,
    private commonService : CommonService,
    
  ) {


  }


  ngOnInit(): void { 
    console.log('form',this.comitee)
    this.updateComiteeForm = this.formBuilder.group({
      CommitteeName: [this.comitee.Name, Validators.required],
      Remark : [this.comitee.Remark,Validators.required]
    })

  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {
    if (this.updateComiteeForm.valid) {

      let comitee: ComiteeAdd = {
        Id:this.comitee?.Id,
        Name: this.updateComiteeForm.value.CommitteeName,
        Remark: this.updateComiteeForm.value.Remark,
        
      }

      this.pmService.updateComittee(comitee).subscribe({

        next: (res) => {
          this.toast = {
            message: ' Committee Successfully Updated',
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

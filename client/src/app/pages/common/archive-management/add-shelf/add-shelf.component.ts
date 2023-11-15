import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';

@Component({
  selector: 'app-add-shelf',
  templateUrl: './add-shelf.component.html',
  styleUrls: ['./add-shelf.component.css']
})
export class AddShelfComponent implements OnInit {

  shelfForm !: FormGroup;
  user!: UserView;
  toast!: toastPayload;

  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {

    this.shelfForm = this.formBuilder.group({
      ShelfNumber: ['', Validators.required],
      Remark: ['']
    })
  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
  }


  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.shelfForm.valid) {

      this.commonService.postShelf({
        ShelfNumber: this.shelfForm.value.ShelfNumber,
        Remark: this.shelfForm.value.Remark,
        CreatedBy: this.user.UserID
      }).subscribe({
        next: (res) => {

          this.toast = {
            message: "Shelf Successfully Creted",
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
            message: "Something went wrong",
            title: 'Network Error.',
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

  }




}

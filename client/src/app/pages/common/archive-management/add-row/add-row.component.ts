import { Component ,Input,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { IShelf } from '../Iarchive';

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.css']
})
export class AddRowComponent implements OnInit {

@Input() shelf !: IShelf 

rowForm !: FormGroup;
user!: UserView;
toast!: toastPayload;

constructor(
  private commonService: CommonService,
  private userService: UserService,
  private activeModal: NgbActiveModal,
  private formBuilder: FormBuilder) {

  this.rowForm = this.formBuilder.group({
    RowNumber: ['', Validators.required],
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

  if (this.rowForm.valid) {



    this.commonService.postRow({
      ShelfId:this.shelf.Id,
      RowNumber: this.rowForm.value.RowNumber,
      Remark: this.rowForm.value.Remark,
      CreatedBy: this.user.UserID
    }).subscribe({
      next: (res) => {

        this.toast = {
          message: "Row Successfully Creted",
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

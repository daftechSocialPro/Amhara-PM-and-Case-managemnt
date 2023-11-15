import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { IRow, IShelf } from '../Iarchive';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent implements OnInit {

  @Input() row !: IRow 

  folderForm !: FormGroup;
  user!: UserView;
  toast!: toastPayload;
  
  constructor(
    private commonService: CommonService,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
  
    this.folderForm = this.formBuilder.group({
      FolderName: ['', Validators.required],
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
  
    if (this.folderForm.valid) {
  
  
      this.commonService.postFolder({
        RowId:this.row.Id,
        FolderName: this.folderForm.value.FolderName,
        Remark: this.folderForm.value.Remark,
        CreatedBy: this.user.UserID
      }).subscribe({
        next: (res) => {
  
          this.toast = {
            message: "Fodler Successfully Creted",
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

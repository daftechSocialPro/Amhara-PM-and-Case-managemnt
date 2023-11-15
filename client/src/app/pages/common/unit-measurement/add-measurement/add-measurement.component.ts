import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { OrganizationService } from '../../organization/organization.service';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent {



  @Output() result = new EventEmitter<boolean>();

  toast !: toastPayload;
  measurmentForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.measurmentForm = this.formBuilder.group({
      Name: ['', Validators.required],
      LocalName: ['', Validators.required],
      Type: ['', Validators.required],
      Remark: ['']
    });
  }

  submit() {

    if (this.measurmentForm.valid) {
      this.orgService.unitOfMeasurmentCreate(this.measurmentForm.value).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Unit of Measurment Successfully Created',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };

          this.commonService.showToast(this.toast);
          this.closeModal();
          this.measurmentForm = this.formBuilder.group({

            Name: [''],
            LocalName: [''],
            Type: [''],
            Remark: ['']
            
          })

          this.result.emit(true)

        }, error: (err) => {
          this.toast = {
            message: err,
            title: 'Network error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);


        }
      }
      );
    }

  }
  closeModal() {

    this.activeModal.close()
  }


}

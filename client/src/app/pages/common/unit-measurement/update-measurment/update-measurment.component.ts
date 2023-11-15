import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { OrganizationService } from '../../organization/organization.service';
import { UnitMeasurment } from '../unit-measurment';

@Component({
  selector: 'app-update-measurment',
  templateUrl: './update-measurment.component.html',
  styleUrls: ['./update-measurment.component.css']
})
export class UpdateMeasurmentComponent {



  @Output() result = new EventEmitter<boolean>();
  @Input() measurement !: UnitMeasurment;
  toast !: toastPayload;
  measurmentForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private orgService: OrganizationService, private commonService: CommonService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log("measurment", this.measurement)

    this.measurmentForm = this.formBuilder.group({
      Name: [this.measurement.Name, Validators.required],
      LocalName: [this.measurement.LocalName, Validators.required],
      Type: [this.measurement.Type, Validators.required],
      RowStatus: [this.measurement.RowStatus, Validators.required],
      Remark: [this.measurement.Remark]
    });
  }

  submit() {

    if (this.measurmentForm.valid) {
      var value = this.measurmentForm.value;
      var unitmeasure: UnitMeasurment = {
        Id: this.measurement.Id,
        Name: value.Name,
        LocalName: value.LocalName,
        Type: value.Type,
        Remark: value.Remark,
        RowStatus: value.RowStatus
      }


      this.orgService.unitOfMeasurmentUpdate(unitmeasure).subscribe({

        next: (res) => {

          this.toast = {
            message: 'Unit of Measurment Successfully Updated',
            title: 'Successfully Updated.',
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

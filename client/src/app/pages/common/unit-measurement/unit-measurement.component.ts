import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { OrganizationService } from '../organization/organization.service';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';
import { UnitMeasurment } from './unit-measurment';
import { UpdateMeasurmentComponent } from './update-measurment/update-measurment.component';

@Component({
  selector: 'app-unit-measurement',
  templateUrl: './unit-measurement.component.html',
  styleUrls: ['./unit-measurement.component.css']
})
export class UnitMeasurementComponent {

  unitOfMeasurments: UnitMeasurment[] = [];
  toast!: toastPayload;



  constructor(private orgService: OrganizationService, private commonService: CommonService, private modalService: NgbModal) {
    this.unitOfMeasurmentsList();
  }

  ngOnInit(): void {
    this.unitOfMeasurmentsList();
  }


  unitOfMeasurmentsList() {
    this.orgService.getUnitOfMeasurment().subscribe({
      next: (res) => {
        this.unitOfMeasurments = res
       
      }, error: (err) => {
        this.toast = {
          message: 'Something went wrong',
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
  }

  addUnitOfMeasurment() {

   let modalRef =  this.modalService.open(AddMeasurementComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then((res)=>{
      this.unitOfMeasurmentsList()
    })

  }

  updateUnitOfMeasurment(unit: UnitMeasurment) {

    let modalref = this.modalService.open(UpdateMeasurmentComponent, { size: 'lg', backdrop: 'static' })
    modalref.componentInstance.measurement = unit
    
    modalref.result.then((res)=>{
      this.unitOfMeasurmentsList();
    })
  }


}

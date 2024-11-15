import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';
import { PMService } from '../../../pm.services';
import { ShowonmapComponent } from '../showonmap/showonmap.component';

@Component({
  selector: 'app-get-activity-progress',
  templateUrl: './get-activity-progress.component.html',
  styleUrls: ['./get-activity-progress.component.css']
})
export class GetActivityProgressComponent implements OnInit {

  @Input() activityId !: string

  actProgress !: any
  ngOnInit(): void {

    this.pmService.GetActivityProgress(this.activityId).subscribe({
      next:(res)=>{
        this.actProgress = res 

        console.log(this.actProgress)

      },error:(err)=>{
        console.error(err)
      }
    })
    
  }

  constructor(private pmService:PMService, private activeModal : NgbActiveModal,private commonService:CommonService, private modalService:NgbModal){

  
  
  }
  getFile(value:string){

    return this.commonService.createImgPath(value)
  }

  closeModal(){

    this.activeModal.close()
  }

  initialize(lat:number,lng:number){

  let modalRef =this.modalService.open(ShowonmapComponent,{size:'lg',backdrop:'static'})
  modalRef.componentInstance.lat=lat
  modalRef.componentInstance.lng = lng
  }
}

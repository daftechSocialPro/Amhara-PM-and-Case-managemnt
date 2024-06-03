import { Component, OnInit } from '@angular/core';
import { PMService } from '../../pm.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { ActivatedRoute } from '@angular/router';
import { KpiDetailItem, KpiDetailPost, KpiGetDto } from '../kpi';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddKpiDetailComponent } from './add-kpi-detail/add-kpi-detail.component';

@Component({
  selector: 'app-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.css']
})
export class KpiDetailComponent implements OnInit {

  kpiData!: KpiGetDto
  kpiId!: string
  user!: UserView
  yearLength!: number
  
  constructor(
    private userService: UserService,
    private pmService: PMService,
    private activatedROute: ActivatedRoute,
    private modalService: NgbModal

  ){}


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.kpiId = this.activatedROute.snapshot.paramMap.get('kpiId')!
    this.getKpiData(this.kpiId)
  }

  getKpiData(kpiId:string){
    this.pmService.GetKPIById(kpiId).subscribe({
      next:(res) => {
        this.kpiData = res
        this.yearLength = this.kpiData.ActiveYears.length
        console.log("this.KPIList",this.kpiData)
        
      }
    })
  }

  addKpi(KpiId: string){
    let modalRef = this.modalService.open(AddKpiDetailComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.KpiId = KpiId
    modalRef.componentInstance.HasSubsidiaryOrganization = this.kpiData.HasSubsidiaryOrganization
    modalRef.result.then(()=>{
      this.getKpiData(this.kpiId)
    })
  }
  getKpiYearData(itemYear: number,item: KpiDetailItem){
    if (item.KPIDatas.length == 0 || !item.KPIDatas) {
      return 0;
    }
    const data = item.KPIDatas.find(x => x.Year == itemYear);
    return data?.Data
  }


 
  // copyToClipboard(): void {
  
  //   const url=`${this.baseUrl}/trainee-form/${this.trainingId}`
  //   const inputElement = this.myInput.nativeElement;
  //   inputElement.value = url;
  //   inputElement.select();
    
  // navigator.clipboard.writeText(url)
  // .then(() => {
  //   this.messageService.add({severity:'info',summary:'Copied to Clipboard',detail:'Training Report form Url Copied'});
  // })
  // .catch((error) => {
  //   console.error('Failed to copy to clipboard:', error);
  // });
  
  // navigator.clipboard.writeText(url)
  //   .then(() => {
  //     this.messageService.add({severity:'info',summary:'Copied to Clipboard',detail:'Training List Url Copied'});
  //   })
  //   .catch((error) => {
  //     console.error('Failed to copy to clipboard:', error);
  //   });
   
  // }


  exportAsExcel(){}
}

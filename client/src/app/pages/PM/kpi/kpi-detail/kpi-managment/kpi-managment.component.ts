import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PMService } from '../../../pm.services';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { SelectList } from 'src/app/pages/common/common';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kpi-managment',
  templateUrl: './kpi-managment.component.html',
  styleUrls: ['./kpi-managment.component.css']
})
export class KpiManagmentComponent implements OnInit {
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
  user!: UserView
  subOrgId!: string
  kpiManagmentData!: any[]
  subOrgSelectList: SelectList[] = []
  date: string = ''
  exportingToExcel = false;
  constructor( 
    private userService: UserService,
    private pmService: PMService,
    private orgService: OrganizationService,
    public translate: TranslateService,
  ){}

  ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.subOrgId = this.user.SubOrgId
      if(this.roleMatch(['Regulator'])){
        this.getSubOrgSelectList()
      }
  }
  
  exportAsExcel(name:string) {
    this.exportingToExcel= true
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}
  getKpiTable(){
    
    this.pmService.GetKpiSeventyById(this.subOrgId, this.date).subscribe({
      next : (res) => {
        this.kpiManagmentData = res
      }
    })
  }

  onSubChange(event: any){
    this.subOrgId = event.target.value
  }

  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  roleMatch (value : string[]){
    return this.userService.roleMatch(value)
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from '../../../case.service';
import { ICaseProgressReport } from '../Icasedetail';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {

  @Input() CaseId!: string
  CaseDetialReport !: ICaseProgressReport
  constructor(private activeModal: NgbActiveModal, private caseService: CaseService) {

  }
  ngOnInit(): void {
    this.caseService.GetProgresReport(this.CaseId).subscribe({
      next: (res) => {
        this.CaseDetialReport = res
      
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  closeModal() {
    this.activeModal.close();
  }

}

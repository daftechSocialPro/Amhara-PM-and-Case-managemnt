import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  @Input() src!: string;
  pdfSrc: any;
  pdfFindController: any;

  ngOnInit(): void {

    console.log(this.src)
    this.loadPdf();
    
  }

  constructor(private commonService: CommonService) {  }

  loadPdf() {
    this.pdfSrc = this.commonService.getPdf(this.src)
  }
}










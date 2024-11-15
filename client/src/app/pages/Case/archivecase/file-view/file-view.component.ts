import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { ViewPdfComponent } from '../../case-detail/view-pdf/view-pdf.component';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  @Input() files : any 
  pdfObjects: string[] = [];
  imageObject: Array<object> = [];

  constructor(
    private activeModal: NgbActiveModal,
    private commonService: CommonService,
    private modalService: NgbModal,

  ){}

  ngOnInit(): void {
    console.log("this.files",this.files)
    this.getAttachemnt(this.files)
  }

  getImage(value: string): string {
    return this.commonService.createImgPath(value)
  }

  getPdfFile(item:string) {
    return this.commonService.getPdf(item)
  }

  getAttachemnt(attachments: SelectList[]) {




    attachments.forEach(element => {



      const fileName = element.Name;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

      if (fileExtension.toLowerCase() == "pdf") {

        var pdfPath = element.Name;
        this.pdfObjects.push(pdfPath)

      }
      else {
        var imageArray = {
          image: this.getImage(element.Name),
          thumbImage: this.getImage(element.Name),
          alt: element.Id,
          title: element.Id,

        }
        this.imageObject.push(imageArray)
      }

    });

  }

  viewPdf (link : string){

    let pdfLink = this.getPdfFile(link)
  
    let modalRef = this.modalService.open(ViewPdfComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.pdflink =  pdfLink
  }
  closeModal() {
    this.activeModal.close()
  }

}

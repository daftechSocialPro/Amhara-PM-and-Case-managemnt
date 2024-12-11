import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { ViewPdfComponent } from '../../case-detail/view-pdf/view-pdf.component';
import { environment } from 'src/environments/environment';

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
  
    let modalRef = this.modalService.open(ViewPdfComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.pdflink =  pdfLink
  }
  closeModal() {
    this.activeModal.close()
  }

  getImageFile(value: string): string {

    return this.commonService.createImgPath(value)
  }


  showPdfModal: boolean = false;
  showImageModal: boolean = false;
  selectedAttachmentPath: string = '';
  selectedAttachmentType: string = '';

  // Handle attachment click
  handleAttachmentClick(item: any) {
    console.log("item",item)
    const filePath = item.Id;
    const fileName = item.Name;

    this.selectedAttachmentPath = fileName;

    // Determine the file type based on its extension
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (fileExtension === 'pdf') {
      // this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.assetUrl}/${this.selectedAttachmentPath}`);
      // this.selectedAttachmentType = 'pdf';
      // this.showPdfModal = true;
      this.viewPdf(this.selectedAttachmentPath)
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
      this.selectedAttachmentType = 'image';
      this.showImageModal = true;
    } else {
      this.downloadFile(fileName);
    }
  }

  // Download file for non-image/PDF files
  downloadFile(filePath: string) {
    // Construct the full URL using the environment asset URL
    const fullUrl = `${environment.assetUrl}/${filePath}`;
  
    // Fetch the file and force the download
    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the file');
        }
        return response.blob(); // Convert response to Blob
      })
      .then((blob) => {
        // Create a temporary Blob URL
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
  
        // Extract the file name from the file path
        const fileName = filePath.split('/').pop() || 'download';
        link.download = fileName; // Set the file name for download
        link.click(); // Trigger the download
        window.URL.revokeObjectURL(url); // Clean up the Blob URL
      })
      .catch((error) => {
        console.error('Error while downloading the file:', error);
      });
  }


}

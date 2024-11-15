import { Component, OnInit, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';

declare const scanner: any;
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  @Output() imagesScannedUpdated: EventEmitter<string[]> = new EventEmitter();
  ngOnInit(): void {

  }
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { 
    this.scanToJpg = this.scanToJpg.bind(this);
    this.displayImagesOnPage = this.displayImagesOnPage.bind(this);
  }

  scannedImage!: string;
  imagesScanned:any = [];
  scan() {


    scanner.scan((result: any) => {
      this.scannedImage = result.imageData;
    });
  }

  scanToJpg() {
    const config = {
      output_settings: [
        {
          type: 'return-base64',
          format: 'jpg'
        }
      ]
    };

    scanner.scan(this.displayImagesOnPage, config);
  }
  displayImagesOnPage(successful: boolean, mesg: string, response: any) {
    if (!successful) {
      console.error('Failed: ' + mesg);
      return;
    }

    if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) {
      console.info('User canceled');
      return;
    }

    const scannedImages = scanner.getScannedImages(response, true, false);
    for (let i = 0; scannedImages instanceof Array && i < scannedImages.length; i++) {
      const scannedImage = scannedImages[i];
      
      this.processScannedImage(scannedImage);
    }
  }

  processScannedImage(scannedImage: any) {
  console.log(scannedImage)
    this.imagesScanned.push(scannedImage);
    this.imagesScannedUpdated.emit(this.imagesScanned);
    const elementImg = this.renderer.createElement('img');
    this.renderer.addClass(elementImg, 'scanned');
    this.renderer.setAttribute(elementImg, 'src', scannedImage.src);
    this.renderer.setStyle(elementImg, 'width', '100px !important');
    const imagesElement = document.getElementById('images');
   
    this.renderer.appendChild(imagesElement, elementImg);
  }

}

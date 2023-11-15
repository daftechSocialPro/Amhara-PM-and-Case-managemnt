import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { IFolder, IRow, IShelf } from '../pages/common/archive-management/Iarchive';
import { Employee } from '../pages/common/organization/employee/employee';

export interface toastPayload {
  message: string;
  title: string;
  ic: IndividualConfig;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  baseUrl: string = environment.baseUrl + '/common'
  baseUrlPdf : string = environment.baseUrl
  constructor(private toastr: ToastrService, private http: HttpClient,private sanitizer: DomSanitizer) { }

  showToast(toast: toastPayload) {
    this.toastr.show(
      toast.message,
      toast.title,
      toast.ic,
      'toast-' + toast.type
    );
  }

  createImgPath = (dbPath: String) => {

    return `${environment.assetUrl}/${dbPath}`;
  }

  getDataDiff(startDat: string, endDat: string) {

    var startDate = new Date(startDat)
    var endDate = new Date(endDat)
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }

  getPdf (path : string ):any{
   
    var url = this.baseUrlPdf + "/pdf?path="+path 
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }


  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log(
                'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
              );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }


  //archive 

  postShelf(shelf: any) {

    return this.http.post(this.baseUrl + "/archive/shelf", shelf)
  }

  getShelf() {

    return this.http.get<IShelf[]>(this.baseUrl + "/archive/shelf")
  }


  postRow(row: any) {
    return this.http.post(this.baseUrl + "/archive/row", row)
  }

  getRow(shelfId: string) {

    return this.http.get<IRow[]>(this.baseUrl + "/archive/row?shelfId=" + shelfId)
  }

  postFolder(folder: any) {
    return this.http.post(this.baseUrl + "/archive/folder", folder)

  }
  getFolder(rowId: string) {
    return this.http.get<IFolder[]>(this.baseUrl + "/archive/folder/filtered?rowId=" + rowId)
  }





}
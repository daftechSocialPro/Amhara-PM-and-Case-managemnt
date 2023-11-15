import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';
import { CompleteCaseComponent } from './complete-case/complete-case.component';
import { MakeAppointmentCaseComponent } from './make-appointment-case/make-appointment-case.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { TransferCaseComponent } from './transfer-case/transfer-case.component';
import lgZoom from 'lightgallery/plugins/zoom';
import { SelectList } from '../../common/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css'],
})
export class CaseDetailComponent implements OnInit {

  settings = {
    counter: false,
    plugins: [lgZoom]
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  caseHistoryId!: string
  user!: UserView
  caseDetail!: ICaseView
  toast !: toastPayload

  permitted: boolean = false;;
  imageObject: Array<object> = [];

  pdfObjects: string[] = [];

  constructor(
    private caseService: CaseService,
    private userService: UserService,
    private router: ActivatedRoute,
    private route: Router,
    private commonService: CommonService,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.caseHistoryId = this.router.snapshot.paramMap.get('historyId')!
    this.getCaseDetail()
    this.IsPermitedApi()
  }
  IsPermitedApi() {
    this.caseService.IsPermitted(this.user.EmployeeId, this.caseHistoryId).subscribe({
      next: (res) => {
        this.permitted = res;
      }, error: (err) => {
        console.log(err)

      }
    })
  }

  getCaseDetail() {
    this.caseService
      .GetCaseDetail(this.user.EmployeeId, this.caseHistoryId)
      .subscribe({
        next: (res) => {
          this.caseDetail = res;
          this.getAttachemnt(this.caseDetail.Attachments)
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
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
  AddtoWaiting() {
    this.confirmationDialogService
      .confirm(
        'Please confirm..',
        'Do you really want to Add Case to waiting list ?'
      )
      .then((confirmed) => {
        if (confirmed) {
          this.caseService.AddtoWaiting(this.caseHistoryId).subscribe({
            next: (res) => {
              this.toast = {
                message: 'Successfully added to waiting list!!',
                title: 'Successfull.',
                type: 'success',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast);
              this.route.navigate(['mycaselist']);
            },
            error: (err) => {
              this.toast = {
                message: 'Something went wrong!!',
                title: 'Network error.',
                type: 'error',
                ic: {
                  timeOut: 2500,
                  closeButton: true,
                } as IndividualConfig,
              };
              this.commonService.showToast(this.toast);
            },
          });
        }
      })
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }

  SendSMS() {
    let modalRef = this.modalService.open(SendSmsComponent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.historyId = this.caseHistoryId;
  }

  CompleteCase() {
    let modalRef = this.modalService.open(CompleteCaseComponent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.historyId = this.caseHistoryId;
  }

  Revert() {
    this.confirmationDialogService
      .confirm('Please confirm..', 'Do you really want to Revert this Case ?')
      .then((confirmed) => {
        if (confirmed) {
          this.caseService
            .RevertCase({
              CaseHistoryId: this.caseHistoryId,
              EmployeeId: this.user.EmployeeId,
            })
            .subscribe({
              next: (res) => {
                this.toast = {
                  message: 'Case Reverted Successfully!!',
                  title: 'Successfull.',
                  type: 'success',
                  ic: {
                    timeOut: 2500,
                    closeButton: true,
                  } as IndividualConfig,
                };
                this.commonService.showToast(this.toast);

                this.route.navigate(['mycaselist']);
              },
              error: (err) => {
                this.toast = {
                  message: 'Something went wrong!!',
                  title: 'Network error.',
                  type: 'error',
                  ic: {
                    timeOut: 2500,
                    closeButton: true,
                  } as IndividualConfig,
                };
                this.commonService.showToast(this.toast);
              },
            });
        }
      })
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }

  TransferCase() {
    let modalRef = this.modalService.open(TransferCaseComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.historyId = this.caseHistoryId;
    modalRef.componentInstance.CaseTypeName = this.caseDetail.CaseTypeName;
    modalRef.componentInstance.CaseTypeId = this.caseDetail.CaseTypeId
  }

  Appointment() {
    let modalRef = this.modalService.open(MakeAppointmentCaseComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.historyId = this.caseHistoryId;
  }

  getImage(value: string): string {

    return this.commonService.createImgPath(value)
  }

  getPdfFile(item:string) {
    return this.commonService.getPdf(item)
  }
getPermission(item:ICaseView){
  
  var value = item.ReciverType!= 'Cc'&& this.permitted;

  return value
}

viewPdf (link : string){

  let pdfLink = this.getPdfFile(link)

  let modalRef = this.modalService.open(ViewPdfComponent,{size:'lg',backdrop:'static'})
  modalRef.componentInstance.pdflink =  pdfLink
}

}

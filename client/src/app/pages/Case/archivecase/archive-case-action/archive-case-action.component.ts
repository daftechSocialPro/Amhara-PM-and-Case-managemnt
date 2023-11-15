import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { IFolder, IRow, IShelf } from 'src/app/pages/common/archive-management/Iarchive';
import { CaseService } from '../../case.service';
import { ICaseView } from '../../encode-case/Icase';

@Component({
  selector: 'app-archive-case-action',
  templateUrl: './archive-case-action.component.html',
  styleUrls: ['./archive-case-action.component.css']
})
export class ArchiveCaseActionComponent implements OnInit {

  @Input() case !: ICaseView

  shelfs!: IShelf[]
  rows !: IRow[]
  folders!: IFolder[]
  toast !: toastPayload

  archiveForm!:FormGroup

  constructor(
    private router : Router,
    private activeModal: NgbActiveModal, 
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private caseService : CaseService) {

    this.archiveForm= this.formBuilder.group({
      FolderId: ['',Validators.required]
    })
   }
  ngOnInit(): void {

    this.getShelfs()
  }

  getShelfs() {

    this.commonService.getShelf().subscribe({
      next: (res) => {
        this.shelfs = res
      }, error: (err) => {
        console.error(err)
      }
    })


  }

  onShelfChange(shelfId: string) {

    this.commonService.getRow(shelfId).subscribe({
      next: (res) => {
        this.rows = res
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  onRowChange(rowId: string) {

    this.commonService.getFolder (rowId).subscribe({
      next:(res)=>{
        this.folders = res 
      },error:(err)=>{
        console.error(err)
      }
    })


  }


  submit(){

    if (this.archiveForm.valid){

    this.caseService.archiveCase({
      CaseId: this.case.Id,
      FolderId:this.archiveForm.value.FolderId

    }).subscribe({
      next:(res)=>{
        this.toast = {
          message: "Arhcived Successfully ",
          title: 'Successfull!!.',
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);  
        this.router.navigate(['archivecase']);
        this.closeModal();

      },error:(err)=>{
        this.toast = {
          message: "Something went wrong ",
          title: 'Network Error!!.',
          type: 'error',
          ic: {
            timeOut: 2500,
            closeButton: true,
          } as IndividualConfig,
        };
        this.commonService.showToast(this.toast);
        console.error(err)
      }
    })

  }

  }

  closeModal() {

    this.activeModal.close()
  }





}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';
import { AddFolderComponent } from './add-folder/add-folder.component';
import { AddRowComponent } from './add-row/add-row.component';

import { AddShelfComponent } from './add-shelf/add-shelf.component';
import { IFolder, IRow, IShelf } from './Iarchive';

@Component({
  selector: 'app-archive-management',
  templateUrl: './archive-management.component.html',
  styleUrls: ['./archive-management.component.css']
})
export class ArchiveManagementComponent implements OnInit {


  shelfs !: IShelf[];
  rows !: IRow[];
  folders ! : IFolder[];
  shelf !: IShelf;
  row!: IRow;

  constructor(private modalService: NgbModal, private commonService: CommonService) { }


  ngOnInit(): void {
    this.getShelfs();
  }

  addShelf() {
    let modalRef = this.modalService.open(AddShelfComponent, { backdrop: 'static' })
    modalRef.result.then(() =>
      this.getShelfs()
    )
  }

  getShelfs() {
    this.commonService.getShelf().subscribe(({
      next: (res) => {
        this.shelfs = res
      }, error: (err) => {
        console.log(err)
      }
    }))
  }

  addRow() {

    let modalRef = this.modalService.open(AddRowComponent, { backdrop: 'static' })
    modalRef.componentInstance.shelf = this.shelf
    modalRef.result.then(() => {
      this.getShelfs()
      this.getRows(this.shelf.Id!)
      this.getFolder(this.row.Id!)
    }
    )

  }

  onShelfClick(value: IShelf) {

    this.shelf = value
    this.getRows(value.Id)

  }

  onRowClick(value: IRow) {

    this.row = value
    this.getFolder(value.Id)

  }

  getRows(shelfId: string) {

    this.commonService.getRow(shelfId).subscribe({
      next: (res) => {

        this.rows = res

      }, error: (err) => {

        console.error(err)
      }
    })
  }

  getFolder(rowId: string) {

    this.commonService.getFolder(rowId).subscribe({
      next:(res)=>{
        this.folders = res
      },error:(err)=>{
        console.error(err)
      }
    })

  }

  addFolder(){
    let modalRef = this.modalService.open(AddFolderComponent, { backdrop: 'static' })
    modalRef.componentInstance.row = this.row
    modalRef.result.then(() => {
      this.getShelfs()
      this.getRows(this.shelf.Id!)
      this.getFolder(this.row.Id!)
    }
    )

  }





}

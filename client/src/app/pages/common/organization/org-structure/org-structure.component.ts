import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { OrganizationService } from '../organization.service';
import { AddStructureComponent } from './add-structure/add-structure.component';
import { OrganizationalStructure } from './org-structure';
import { UpdateStructureComponent } from './update-structure/update-structure.component';
import { DiagramComponent } from 'gojs-angular';
import * as go from 'gojs';

import { TreeNode } from 'primeng/api';
import { SelectList } from '../../common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const jsc: any;
interface IStructureTree {
  key: string;
  name: string;
  parent: string;
}
@Component({
  selector: 'app-org-structure',
  templateUrl: './org-structure.component.html',
  styleUrls: ['./org-structure.component.css'],
})
export class OrgStructureComponent implements OnInit {
  @ViewChild(DiagramComponent, { static: false })
  diagramComponent!: DiagramComponent;
  familyData: IStructureTree[] = [];

  public diagramDivClassName = 'myDiagramDiv';
  public diagramModelData = { prop: 'value', color: 'red' };

  public dia: any;

  @ViewChild('myDiag', { static: false }) myDiag!: DiagramComponent;

  structures: OrganizationalStructure[] = [];
  toast!: toastPayload;
  structure!: OrganizationalStructure;
  branchs!: SelectList[]
  serachForm!: FormGroup
  data: TreeNode[] = [
   
  ];

  constructor(
    private elementRef: ElementRef,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
   
  }

  ngOnInit(): void {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
   

    this.serachForm = this.formBuilder.group({
      branchId: ['', Validators.required],
 
    })


    this.orgService.getOrgBranchSelectList().subscribe({
      next: (res) => {

        this.branchs = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  



  addStructure() {
    let modalRef = this.modalService.open(AddStructureComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.result.then(() => {
      this.Search();
    });
  }
  updateStructure(value: OrganizationalStructure) {
    let modalRef = this.modalService.open(UpdateStructureComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.structure = value;

    modalRef.result.then(() => {
      this.Search();
    });
  }
  Search(){

    this.orgService.getOrgStructureDiagram(this.serachForm.value.branchId).subscribe({
      next:(res)=>{
        
        this.data=res
      },error:(err=>{
        console.log(err)
      })
    });
    this.orgService.getOrgStructureList(this.serachForm.value.branchId).subscribe({
      next: (res) => {
        this.structures = res;
        res.forEach((el) => {
          this.familyData.push({
            key: el.Id,
            name: `${el.StructureName}\n${el.Weight}% ${
              el.ParentWeight !== null ? `of ${el.ParentWeight}` : ''
            }`,
            parent: el.ParentStructureId,
          });
        });
        console.log(res);
      },
      error: (err) => {
        this.toast = {
          message: 'Something went wrong',
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
}

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { OrganizationService } from '../organization.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import { WoredaDto } from '../woreda/woreda.dto';
import { KebeleDto } from './kebele.model';

@Component({
  selector: 'app-kebele',
  templateUrl: './kebele.component.html',
  styleUrls: ['./kebele.component.css']
})
export class KebeleComponent {
  kebeles: KebeleDto[] = [];
  filteredKebeles: KebeleDto[] = [];
  dataForm!: FormGroup;
  toast!: toastPayload;
  isEditing!: boolean;
  selectedStatus: string = ''; // Default to "active" status
  woredas: WoredaDto[] = [];
  selectedWoreda:string ="";
  constructor(
    private orgService: OrganizationService,
    private commonService: CommonService,
    private modalService: NgbModal,
    public translate: TranslateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isEditing = false;
    this.dataForm = this.formBuilder.group({
      Id: [''],
      WoredaId: ['', Validators.required],
      Name: ['', Validators.required],
      RowStatus: ['']
    });
    this.getKebeles();
    this.getWoredas();
  }
  
  getKebeles() {
    if(this.selectedWoreda.length){
    this.orgService.getKebeles(this.selectedWoreda).subscribe({
      next: (res) => {
        this.kebeles = res;
        this.filteredKebeles = res;
        this.filterKebeles(this.selectedStatus); // Apply the initial filter
      },
      error: (err) => {
        console.error(err);
      }
    });
    } 
  }

  getWoredas() {
    this.orgService.getWoredas().subscribe({
      next: (woredas) => {
        this.woredas = woredas.filter(item => item.RowStatus.toString() === '0'); // Active Woredas
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openAddModal(content: any) {
    this.isEditing = false;
    this.modalService.open(content, { size: 'md', backdrop: 'static' });
  }

  openEditModal(content: any, data: KebeleDto) {
    this.dataForm.patchValue(data);
    this.isEditing = true;
    this.modalService.open(content, { size: 'md', backdrop: 'static' });
  }

  submit() {
    if (this.dataForm.valid) {
      if (!this.isEditing) {
        this.orgService.createKebele(this.dataForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: 'Kebele added successfully',
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.getKebeles();
            this.closeModal();
          },
          error: (err) => {
            this.toast = {
              message: err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
          }
        });
      } else {
        this.orgService.updateKebele(this.dataForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: 'Kebele updated successfully',
              title: 'Successfully Updated.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.getKebeles();
            this.closeModal();
          },
          error: (err) => {
            this.toast = {
              message: err,
              title: 'Network error.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
          }
        });
      }
    }
  }

  // Filter method
  filterKebeles(value: string) {
    const searchTerm = value.toLowerCase();
    this.filteredKebeles = this.kebeles.filter((item) => {
      const matchesSearch = item.Name.toLowerCase().includes(searchTerm);
      const matchesStatus = this.selectedStatus === '' || item.RowStatus.toString() === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.dataForm.reset();
  }
}

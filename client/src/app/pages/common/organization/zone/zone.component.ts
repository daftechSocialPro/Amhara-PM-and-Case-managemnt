import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { OrganizationService } from '../organization.service';
import { ZoneDto } from './zone.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent {
  user!: UserView
  zones: ZoneDto[] = []
  filterdZones: ZoneDto[] = []
  dataForm !: FormGroup;
  toast !: toastPayload;
  isEditing!: boolean;
  selectedStatus: string = '';  // Default to "active" status (adjust if needed)

  constructor(private orgService: OrganizationService,
    private commonServcie: CommonService,
    private modalService: NgbModal,
    private userService: UserService,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.listZones();
    this.isEditing = false;
    this.dataForm = this.formBuilder.group({ 
      Id:[''],
      Name: ['', Validators.required],
      Remark: [''],
      RowStatus: ['']
    });
    this.Filter(this.selectedStatus); // Automatically filter zones on component load
  }

  listZones() {
    this.orgService.getZones().subscribe({
      next: (res) => {
        this.zones = res
        this.filterdZones = res
        this.Filter(this.selectedStatus); // Reapply filter after fetching zones
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  submit() {
    if (this.dataForm.valid) {
      if (!this.isEditing) {
        this.orgService.createZone(this.dataForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: 'zone added successfully',
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.listZones();
            this.closeModal();
            this.dataForm.reset();
          }, error: (err) => {
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
        this.orgService.updateZone(this.dataForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: 'zone updated successfully',
              title: 'Successfully Updated.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.listZones();
            this.closeModal();
          }, error: (err) => {
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

  openAddModal(content: any) {
    this.isEditing = false;
    this.modalService.open(content, { size: 'md', backdrop: 'static' });
  }

  openEditModal(content: any, data: ZoneDto) {
    this.dataForm.patchValue(data);
    this.isEditing = true;
    this.modalService.open(content, { size: 'md', backdrop: 'static' });
  }

  // Filter method
  Filter(value: string) {
    const searchTerm = value.toLowerCase();
    this.filterdZones = this.zones.filter((item) => {
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

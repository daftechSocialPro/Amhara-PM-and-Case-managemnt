import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { OrganizationService } from '../organization.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import { WoredaDto } from './woreda.dto';
import { ZoneDto } from '../zone/zone.model';

@Component({
  selector: 'app-woreda',
  templateUrl: './woreda.component.html',
  styleUrls: ['./woreda.component.css']
})
export class WoredaComponent {
  user!: UserView
  woredas: WoredaDto[] = []
  filterdWoredas: WoredaDto[] = []
  dataForm !: FormGroup;
  toast !: toastPayload;
  isEditing!: boolean;
  selectedStatus: string = '';  // Default to "active" status (adjust if needed)
  zones: ZoneDto[] = [];
  selectedKebele:string ="";
  constructor(private orgService: OrganizationService,
    private commonServcie: CommonService,
    private modalService: NgbModal,
    private userService: UserService,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.listWoredas();
    this.isEditing = false;
    this.dataForm = this.formBuilder.group({ 
      Id:[''],
      ZoneId:['',Validators.required],
      Name: ['', Validators.required],
      Remark: [''],
      RowStatus: ['']
    });
    this.Filter(this.selectedStatus); // Automatically filter woredas on component load
    this.listZones();
  }

  listWoredas() {
    if(this.selectedKebele.length)
    this.orgService.getWoredas(this.selectedKebele).subscribe({
      next: (res) => {
        this.woredas = res
        this.filterdWoredas = res
        this.Filter(this.selectedStatus); // Reapply filter after fetching woredas
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  listZones() {
    this.orgService.getZones().subscribe({
      next: (res) => {
        this.zones = res.filter(item=> item.RowStatus.toString() === '0')
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  submit() {
    if (this.dataForm.valid) {
      if (!this.isEditing) {
        this.orgService.createWoreda(this.dataForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: 'Woreda added successfully',
              title: 'Successfully Created.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.listWoredas();
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
        this.orgService.updateWoreda(this.dataForm.value).subscribe({
          next: (res) => {
            this.toast = {
              message: 'Woreda updated successfully',
              title: 'Successfully Updated.',
              type: 'success',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.commonService.showToast(this.toast);
            this.listWoredas();
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

  openEditModal(content: any, data: WoredaDto) {
    this.dataForm.patchValue(data);
    this.isEditing = true;
    this.modalService.open(content, { size: 'md', backdrop: 'static' });
  }

  // Filter method
  Filter(value: string) {
    const searchTerm = value.toLowerCase();
    this.filterdWoredas = this.woredas.filter((item) => {
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

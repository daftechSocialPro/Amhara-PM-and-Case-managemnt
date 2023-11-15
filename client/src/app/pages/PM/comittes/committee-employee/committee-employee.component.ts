import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { SelectList } from 'src/app/pages/common/common';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../pm.services';
import { CommiteeAddEmployeeView, CommitteeView } from '../committee';

@Component({
  selector: 'app-committee-employee',
  templateUrl: './committee-employee.component.html',
  styleUrls: ['./committee-employee.component.css']
})
export class CommitteeEmployeeComponent implements OnInit {

  @Input() committee!: CommitteeView;
  toast!: toastPayload;
  employees: SelectList[] = [];
  selectedEmployee!: string[];
  selectedEmployee2!: string[];
  user !: UserView;


  constructor(
    private activeModal: NgbActiveModal,
    private pmService: PMService,
    private commonService: CommonService,
    private userService: UserService) {

  }

  ngOnInit(): void {

    this.listOfEmployees()

    this.user = this.userService.getCurrentUser()

  }

  listOfEmployees() {
    this.pmService.getNotIncludedEmployees(this.committee.Id
    ).subscribe({
      next: (res) => {
        this.employees = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  closeModal() {
    this.activeModal.close()
  }

  addEmpinCommittee() {


    console.log(this.selectedEmployee)
    
    if (this.selectedEmployee) {

      let empCommitte: CommiteeAddEmployeeView = {
        CommiteeId: this.committee.Id,
        EmployeeList: this.selectedEmployee,
        CreatedBy: this.user.UserID

      }

      this.pmService.addEmployesInCommitee(empCommitte).subscribe({
        next: (res) => {
          this.toast = {
            message: ' Employee added to Committee Successfully',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);

          this.closeModal()
        }, error: (err) => {
          console.log(err)
        }
      })
    }



  }

  removeEmpinCommitee() {


    if (this.selectedEmployee2) {
      let empCommitte: CommiteeAddEmployeeView = {

        CommiteeId: this.committee.Id,
        EmployeeList: this.selectedEmployee2,
        CreatedBy: this.user.UserID
      }
      this.pmService.removeEmployesInCommitee(empCommitte).subscribe({
        next: (res) => {
          this.toast = {
            message: ' Employee removed from Committee Successfully',
            title: 'Successfully Created.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
          this.closeModal()
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  }



}

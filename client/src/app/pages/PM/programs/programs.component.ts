import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProgramsComponent } from './add-programs/add-programs.component';
import { Program } from './Program';
import { ProgramService } from './programs.services';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {


  user!: UserView
  Programs: Program[] = []
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private programService: ProgramService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    console.log('this.user: ', this.user);

    this.listPrograms()
  }

  listPrograms() {

    this.programService.getPrograms(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.Programs = res

        console.log('programs', res)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  getProjects(programId: string) {

    this.router.navigate(['plan', { programId: programId }])

  }


  addProgram() {
    let modalRef = this.modalService.open(AddProgramsComponent, { size: 'xl', backdrop: 'static' })

    modalRef.result.then((res) => {
      this.listPrograms()
    })

  }

  editProgram(program: Program) {
    let modalRef = this.modalService.open(AddProgramsComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.program = program
    modalRef.result.then((res) => {
      this.listPrograms()
    })

  }

  programDetail(programId: string) {
    let modalRef = this.modalService.open(ProgramDetailComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.programId = programId
    modalRef.result.then((res) => {
      this.listPrograms()
    })

  }

  deleteProgram(programId: string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Program?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.programService.deleteProgram(programId).subscribe({
          next: (res) => {
            debugger
            if (res.Success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.Message });
              this.listPrograms()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.Message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });


  }


}

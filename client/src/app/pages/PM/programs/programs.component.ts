import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProgramsComponent } from './add-programs/add-programs.component';
import { Program } from './Program';
import { ProgramService } from './programs.services';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {


  user!: UserView
  Programs: Program[] = []
  constructor(
    private router : Router ,
    private modalService: NgbModal, 
    private programService: ProgramService,
    private userService: UserService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    console.log('this.user: ', this.user);

    this.listPrograms()
  }

  listPrograms() {

    this.programService.getPrograms(this.user.SubOrgId).subscribe({
      next: (res) => {
        this.Programs = res

        console.log('programs',res)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  getProjects(programId: string ){

    this.router.navigate(['plan',{programId:programId}])

  }


  addProgram() {
    let modalRef = this.modalService.open(AddProgramsComponent, { size: 'xl', backdrop: 'static' })

    modalRef.result.then((res) => {
      this.listPrograms()
    })

  }



}

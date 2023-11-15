import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PMService } from '../pm.services';
import { AddComiteeComponent } from './add-comitee/add-comitee.component';
import { CommitteeView } from './committee';
import { CommitteeEmployeeComponent } from './committee-employee/committee-employee.component';
import { UpdateCpmmitteeComponent } from './update-cpmmittee/update-cpmmittee.component';

@Component({
  selector: 'app-comittes',
  templateUrl: './comittes.component.html',
  styleUrls: ['./comittes.component.css']
})
export class ComittesComponent implements OnInit {
  
  committees : CommitteeView[]=[]
  constructor (
    private modalService : NgbModal,
    private pmService  : PMService
    
  ){}
  ngOnInit(): void {


   this.listCommittee()
  }

  listCommittee (){

    this.pmService.getComittee().subscribe({
      next:(res)=>{
        this.committees = res 

        console.log("comittes", res )
      }
    })
  }

  addCommitte(){

    let modalRef= this.modalService.open(AddComiteeComponent,{size:'md',backdrop:'static'})
    modalRef.result.then(()=>{

      this.listCommittee()
    })
  }

  employees(value : CommitteeView){

    let modalRef = this.modalService.open(CommitteeEmployeeComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.committee = value 
    modalRef.result.then(()=>{
      this.listCommittee()
    })


  }
  update(value : CommitteeView){

    let modalRef = this.modalService.open(UpdateCpmmitteeComponent,{size:'md',backdrop:'static'})
    modalRef.componentInstance.comitee = value
    modalRef.result.then(()=>{

      this.listCommittee()
    })
  }



}

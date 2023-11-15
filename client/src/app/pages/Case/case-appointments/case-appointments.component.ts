import { Component, OnInit } from '@angular/core';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { IAppointmentGet } from '../case-detail/make-appointment-case/Iappointmentwithcalander';
import { CaseService } from '../case.service';
declare const $: any

@Component({
  selector: 'app-case-appointments',
  templateUrl: './case-appointments.component.html',
  styleUrls: ['./case-appointments.component.css']
})
export class CaseAppointmentsComponent implements OnInit {
  user !: UserView
  appointments !: IAppointmentGet[]


  constructor(private userService: UserService,private caseService : CaseService ){}
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getAppointments()
  }

  getAppointments (){

    this.caseService.getAppointment(this.user.EmployeeId).subscribe({
      next:(res)=>{
     
        this.appointments =res 
        this.intializeCalander()
        
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }
  intializeCalander (){
   

    $('#calendar').evoCalendar({
      'language': 'am',
      'theme': 'Royal Navy',
      
      // Supported language: en, es, de..
    });

    $('#calendar').evoCalendar('addCalendarEvent',this.appointments);
    


  }

}

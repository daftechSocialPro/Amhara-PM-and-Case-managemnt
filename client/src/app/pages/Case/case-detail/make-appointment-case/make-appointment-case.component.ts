import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { CaseService } from '../../case.service';
import { IAppointmentGet, IAppointmentWithCalander } from './Iappointmentwithcalander';
declare const $: any

@Component({
  selector: 'app-make-appointment-case',
  templateUrl: './make-appointment-case.component.html',
  styleUrls: ['./make-appointment-case.component.css']
})
export class MakeAppointmentCaseComponent implements OnInit {

  @Input() historyId!: string
  appointmentForm !: FormGroup
  user !: UserView
  toast!:toastPayload
  appointments !: IAppointmentGet[]


  

  constructor(
    private activeModal: NgbActiveModal,
    private commonService: CommonService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private caseService: CaseService
  ) {

    this.appointmentForm = this.formBuilder.group({
      AppointementDate: ['', Validators.required],
      Time: ['', Validators.required]

    })
  }
  ngOnInit(): void {
    $('#exdate').calendarsPicker({
      calendar: $.calendars.instance('ethiopian', 'am'),
      onSelect: (date: any) => { 
        
        
        if(date){

          this.appointmentForm.controls['AppointementDate'].setValue(date[0]._month+"/"+date[0]._day+"/"+date[0]._year)
           
        
        }// this.StartDate = date

      
      },
    })



    this.user = this.userService.getCurrentUser()
    this.getAppointments()
  }

  intializeCalander (){
   

      $('#calendar').evoCalendar({
        'language': 'am',
        'theme': 'Royal Navy',
        
        // Supported language: en, es, de..
      });

      $('#calendar').evoCalendar('addCalendarEvent',this.appointments);
      
  
  
 
  }



  

  getAppointments (){

    this.caseService.getAppointment(this.user.EmployeeId).subscribe({
      next:(res)=>{
        console.log(res)
        this.appointments =res 
        this.intializeCalander()
        
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  

  submit() {

if (this.appointmentForm.valid){

      let appoint: IAppointmentWithCalander = {
        EmployeeId: this.user.EmployeeId,
        AppointementDate: this.appointmentForm.value.AppointementDate,
        Time: this.appointmentForm.value.Time,
        CaseId: this.historyId,
        CreatedBy: this.user.UserID
      }

      console.log(appoint)
      this.caseService.AppointCase(appoint).subscribe({
        next: (res) => {

          this.appointments.push(res)
          $('#calendar').evoCalendar('addCalendarEvent',this.appointments);
          this.toast = {
            message: "Appointed Successfully !!",
            title: 'Successful.',
            type: 'success',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
                  
        
        }, error: (err) => {

          this.toast = {
            message: "Something went wrong !!",
            title: 'Network Error.',
            type: 'error',
            ic: {
              timeOut: 2500,
              closeButton: true,
            } as IndividualConfig,
          };
          this.commonService.showToast(this.toast);
        

          console.error(err)
        }
      })
    
}

  }
  closeModal() {
    this.activeModal.close()
  }


}

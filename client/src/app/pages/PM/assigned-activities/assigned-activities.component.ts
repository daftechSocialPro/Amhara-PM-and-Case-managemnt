import { Component, OnInit } from '@angular/core';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { PMService } from '../pm.services';
import { ActivityView } from '../view-activties/activityview';

@Component({
  selector: 'app-assigned-activities',
  templateUrl: './assigned-activities.component.html',
  styleUrls: ['./assigned-activities.component.css']
})
export class AssignedActivitiesComponent implements OnInit {

  user !: UserView
  Activties!: ActivityView[]

  constructor(

    private pmService: PMService,
    private userService: UserService

  ) {

  }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();
    this.getAssignedActivites()

  }

  getAssignedActivites() {
    this.pmService.getAssignedActivities(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.Activties = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }



}

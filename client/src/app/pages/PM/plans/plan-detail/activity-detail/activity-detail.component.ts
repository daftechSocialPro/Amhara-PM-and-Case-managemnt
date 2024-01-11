import { Component, Input, OnInit } from '@angular/core';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { ActivityView } from '../../../view-activties/activityview';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements  OnInit{
  @Input() Activties!: ActivityView[]
  user!: UserView
  

  constructor(
    private userService: UserService,
    
  ){}

  ngOnInit(): void {
    
    this.user = this.userService.getCurrentUser()
    console.log("activities",this.Activties)
    


  }


}

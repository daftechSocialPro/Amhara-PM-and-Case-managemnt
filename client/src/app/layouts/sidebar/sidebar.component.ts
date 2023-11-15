import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from 'src/app/pages/pm/pm.services';
import { ActivityView } from 'src/app/pages/PM/view-activties/activityview';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user !: UserView
  Activties!: ActivityView[]
  constructor(private router : Router
    ,private pmService: PMService,
    private userService: UserService,
    
) {
    
  }
  route:string =""
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();
    this.getAssignedActivites()

  }
  getUrl(){
    return this.router.url
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

  roleMatch (value : string[]){

return this.userService.roleMatch(value)
  }






}

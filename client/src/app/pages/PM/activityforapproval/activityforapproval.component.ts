import { Component, Input } from '@angular/core';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { PMService } from '../pm.services';
import { ActivityView } from '../view-activties/activityview';

@Component({
  selector: 'app-activityforapproval',
  templateUrl: './activityforapproval.component.html',
  styleUrls: ['./activityforapproval.component.css']
})
export class ActivityforapprovalComponent {

 @Input() Activties!: ActivityView[]
 user!:UserView

  constructor(

    private pmService: PMService,
    private userService: UserService

  ) {

  }

  ngOnInit(): void {
if(!this.Activties){
    this.user = this.userService.getCurrentUser();
    this.getActivityForApproval()
}

  }

  getActivityForApproval() {
    this.pmService.getActivityForApproval(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.Activties = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }




}

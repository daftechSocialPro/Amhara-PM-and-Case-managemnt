import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthGuard } from 'src/app/auth/auth.guard';
import { PMService } from 'src/app/pages/pm/pm.services';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { ActivityView } from 'src/app/pages/PM/view-activties/activityview';
import { Route, Router } from '@angular/router';
import { ICaseView } from 'src/app/pages/case/encode-case/Icase';
import { CaseService } from 'src/app/pages/case/case.service';
import { CommonService } from 'src/app/common/common.service';
import { NotificationService } from './notification.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 


  activites!: ActivityView[]
  user!: UserView
  assignedCases !: ICaseView[]
  issuedCases ! : ICaseView[]
  public connection!: signalR.HubConnection;
  urlHub : string = environment.assetUrl+"/ws/Encoder"


  constructor(@Inject(DOCUMENT) private document: Document,
   private authGuard: AuthGuard, 
   private pmService: PMService, 
   private userService: UserService,
   private caseService : CaseService,
   private router : Router,
   private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    // this.notificationService.getNotifications().subscribe((notification) => {
    //   this.notifications.push(notification);
    // });
    this.getActivityForApproval()
    this.getAssignedCases()
    this.getIssuedCases()

   
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl(this.urlHub, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Debug)
    .build();

  this.connection.start()
    .then((res) => {
      console.log("employeeId",this.user.EmployeeId)
     this.connection.invoke('addDirectorToGroup', this.user.EmployeeId);
      console.log('Connection started.......!');
    })
    .catch((err) => console.log('Error while connecting to the server', err));

  

  if (this.connection){

  this.connection.on('getNotification', (result) => {
   this.getAssignedCases()
  });
}
  
  }

  getIssuedCases (){

    this.caseService.getAllIssue(this.user.EmployeeId).subscribe({
      next:(res)=>{

        console.log(res)
        this.issuedCases = res 

      },error:(err)=>{
        console.error(err)
      }
    })
  }

  getAssignedCases(){

    this.caseService.getCasesNotification(this.user.EmployeeId).subscribe({
      next:(res)=>{
        console.log("result",res)
        this.assignedCases = res 
      },
      error:(err)=>{
        console.error(err)
      }

    })
  }


  detailCase(caseHistoryId: string) {
    this.router.navigate(['caseHistory',{caseHistoryId:caseHistoryId}])
  }
  
  getActivityForApproval() {

    this.pmService.getActivityForApproval(this.user.EmployeeId).subscribe({
      next: (res) => {

        this.activites = res

        console.log("act",res)

      }, error: (err) => {
        console.error(err)
      }
    })
  }

  createImagePath(value: string){

    return this.commonService.createImgPath(value)

  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  routeToApproval (act:ActivityView){
    
    this.router.navigate(['actForApproval',{Activties:act}])
  }

  logOut() {

    this.authGuard.logout();
  }
}

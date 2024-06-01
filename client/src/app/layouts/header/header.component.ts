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
// Language
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/service/language.service';


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
  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  public connection!: signalR.HubConnection;
  urlHub : string = environment.assetUrl+"/ws/Encoder"


  constructor(@Inject(DOCUMENT) private document: Document,
   private authGuard: AuthGuard, 
   private pmService: PMService, 
   private userService: UserService,
   private caseService : CaseService,
   private router : Router,
   private commonService: CommonService,
   public languageService: LanguageService,
   public _cookiesService: CookieService, 
   public translate: TranslateService, 
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.flagvalue = "assets/images/us.svg"
    // this.notificationService.getNotifications().subscribe((notification) => {
    //   this.notifications.push(notification);
    // });
    this.getActivityForApproval()
    this.getAssignedCases()
    this.getIssuedCases()
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.svg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

   
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


   /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/us.svg', lang: 'en' },
    { text: 'አማረኛ', flag: 'assets/images/et.svg', lang: 'am' },
  ];

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    console.log("hi",flag)
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
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
  roleMatch (value : string[]){

    return this.userService.roleMatch(value)
  }
}

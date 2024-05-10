import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/pages-login/user.service';
@Component({
  selector: 'app-organization-profile-detail',
  templateUrl: './organization-profile-detail.component.html',
  styleUrls: ['./organization-profile-detail.component.css']
})
export class OrganizationProfileDetailComponent implements OnInit{

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.document.body.classList.toggle('toggle-sidebar');

  }

  goToHome(){
    if(this.IsInRole(['Monitor'])){
      this.router.navigateByUrl('/analyticsdashboard');

    }
    else{
      this.router.navigateByUrl('/casedashboard');
    }
  }

  IsInRole(roles:string[]){
    return this.userService.roleMatch(roles)
  }

}

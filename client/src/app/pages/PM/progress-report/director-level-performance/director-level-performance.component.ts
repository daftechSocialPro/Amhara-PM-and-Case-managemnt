import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { PMService } from '../../pm.services';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { OrganizationService } from 'src/app/pages/common/organization/organization.service';
import { SelectList } from 'src/app/pages/common/common';

@Component({
  selector: 'app-director-level-performance',
  templateUrl: './director-level-performance.component.html',
  styleUrls: ['./director-level-performance.component.css']
})
export class DirectorLevelPerformanceComponent implements OnInit {

  user!: UserView
  data: TreeNode[] = [
  ];
  subOrgSelectList: SelectList[] = []

  constructor(private pmService : PMService, private userService: UserService, private orgService: OrganizationService){

  }
  ngOnInit(): void {
    this.user = this .userService.getCurrentUser()
    this.getSubOrgSelectList()
    this.getOrganizationList(this.user.SubOrgId)
  }

  getOrganizationList(subOrgId: string){
    this.pmService.getDirectorLevelPerformance(subOrgId).subscribe({
      next:(res)=>{    
        this.data=res
      },error:(err=>{
        console.log(err)
      })
    })
  }

  getSubOrgSelectList() {
    this.orgService.getSubOrgSelectList().subscribe({
      next: (res) => this.subOrgSelectList = res,
      error: (err) => console.error(err)
    })
  }
  onSubChange(event: any) {
    if (event.target.value !== "") {
      this.getOrganizationList(event.target.value)
    } else {
      this.getOrganizationList(this.user.SubOrgId)
    }
  }


}

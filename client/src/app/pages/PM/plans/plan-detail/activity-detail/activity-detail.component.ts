import { Component, Input, OnInit } from '@angular/core';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { ActivityView, ViewProgressDto } from '../../../view-activties/activityview';
import { ActivatedRoute } from '@angular/router';
import { PMService } from '../../../pm.services';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements  OnInit{
  user!: UserView
  actId! : string
  Activties! : ActivityView
  progress!:ViewProgressDto[];


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private pmService: PMService,
    private commonService: CommonService
  ){}

  ngOnInit(): void {
    
    this.user = this.userService.getCurrentUser()
    this.actId = this.activatedRoute.snapshot.paramMap.get('actId')!
    this.getActivity(this.actId)
    this.getProgress(this.actId)

  }

  getActivity(actId: string){
    this.pmService.getactivityById(actId).subscribe({
      next:(res) => {
        this.Activties= res
      }, error:(err) => {
        console.error(err)
      }
    })
  }

  getProgress (actId:string){

    this.pmService.viewProgress(actId).subscribe({
      next:(res)=>{
        this.progress = res
        console.log(res) 
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  getFilePath (value:string){

    return this.commonService.createImgPath(value)

  }

}

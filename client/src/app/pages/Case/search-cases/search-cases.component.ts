import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CaseService } from '../case.service';
import { ICaseView } from '../encode-case/Icase';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';

@Component({
  selector: 'app-search-cases',
  templateUrl: './search-cases.component.html',
  styleUrls: ['./search-cases.component.css']
})
export class SearchCasesComponent implements OnInit {

  user!:UserView
  searchForm !: FormGroup
  myacaselist!: ICaseView[]
  constructor(private caseService : CaseService,private formBuilder: FormBuilder, private userService: UserService){}
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.searchForm = this.formBuilder.group({

      key : ['']

    })
    
  }

  getSearchCases(){

    this.caseService.getSearchCases(this.searchForm.value.key,this.user.SubOrgId).subscribe({
      next:(res)=>{

      this.myacaselist = res 

      },error:(err)=>{

      }
    })

  }

  Search( ){

    this.getSearchCases()
  }

}

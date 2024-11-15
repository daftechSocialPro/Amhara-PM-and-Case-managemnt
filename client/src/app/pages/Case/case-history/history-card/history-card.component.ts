import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserView } from 'src/app/pages/pages-login/user';
import { ICaseView } from '../../encode-case/Icase';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit {

  @Input() caseHistory! : ICaseView
  @Input() index!:number
  @Input() user!:UserView
 
  constructor (private router : Router){}
  ngOnInit(): void {
    
  }


  caseDetail(historyId:string){

    this.router.navigate(['casedetail',{historyId:historyId}])

  }

  

}

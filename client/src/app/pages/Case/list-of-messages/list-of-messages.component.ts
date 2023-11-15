import { Component, OnInit } from '@angular/core';
import { CaseService } from '../case.service';
import { IUnsentMessage } from './Imessage';

@Component({
  selector: 'app-list-of-messages',
  templateUrl: './list-of-messages.component.html',
  styleUrls: ['./list-of-messages.component.css']
})
export class ListOfMessagesComponent implements OnInit {
  selectedmessages: IUnsentMessage[]=[];
  messages!: IUnsentMessage[] 
  constructor(private caseService : CaseService){}
  ngOnInit(): void {
    
    this.getMessages()
  }

  getMessages(){

    this.caseService.getMessages().subscribe({
      next:(res)=>{
        this.messages = res

        console.log(res)
      },error:(err)=>{

        console.error(err)
      }
    })
  }

  sendMessage(){
    console.log("messages",this.selectedmessages)

    this.caseService.sendUnsentMessages(this.selectedmessages).subscribe({
      next:(res)=>{
        this.getMessages()

      },error:(err)=>{
        console.error(err)
      }
    })
  }

  
}

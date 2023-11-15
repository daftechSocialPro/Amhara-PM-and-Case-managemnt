import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { UserService } from './pages/pages-login/user.service';
import { UserView } from './pages/pages-login/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Case & Project Managment';
  constructor(private elementRef: ElementRef,  public  _router: Router,private userService: UserService) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

   
  }


}

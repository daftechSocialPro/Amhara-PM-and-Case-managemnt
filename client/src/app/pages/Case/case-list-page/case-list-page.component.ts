import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-case-list-page',
  templateUrl: './case-list-page.component.html',
  styleUrls: ['./case-list-page.component.css']
})
export class CaseListPageComponent {
constructor (
  public  translate: TranslateService
){}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BudgetYear, BudgetYearwithoutId, ProgramBudgetYear, SelectList } from '../common';

@Injectable({
  providedIn: 'root'
})
export class BudgetYearService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl + "/BudgetYear";


  // Program Budget Year
  CreateProgramBudgetYear(ProgramBudgetYear: ProgramBudgetYear) {

    return this.http.post(this.BaseURI, ProgramBudgetYear)
  }

  getProgramBudgetYear() {
    return this.http.get<ProgramBudgetYear[]>(this.BaseURI)
  }

  getProgramBudgetYearSelectList() {
    return this.http.get<SelectList[]>(this.BaseURI + "/programbylist")
  }



  CreateBudgetYear(BudgetYear: BudgetYearwithoutId) {

    return this.http.post(this.BaseURI + "/budgetyear", BudgetYear)
  }

  getBudgetYear(value: string) {
    return this.http.get<BudgetYear[]>(this.BaseURI + "/budgetyear?programBudgetYearId=" + value)
  }

  getBudgetYearSelectList() {
    return this.http.get<SelectList[]>(this.BaseURI + "/budgetbylist")
  }


  getBudgetYearByProgramId (value:string){

    return this.http.get<SelectList[]>(this.BaseURI+"/budgetyearbyprogramid?programId="+value)

  }


}

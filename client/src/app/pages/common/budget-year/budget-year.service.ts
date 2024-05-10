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

  EditProgramBudgetYear(programBudgetYear: ProgramBudgetYear){
    return this.http.put(this.BaseURI, programBudgetYear)
  }

  DeleteProgramBudgetYear(programBudgetYeatId: string){
    return this.http.delete(this.BaseURI + "?programBudgetYeatId=" + programBudgetYeatId)
  }

  getProgramBudgetYear(subOrgId: string) {
    return this.http.get<ProgramBudgetYear[]>(this.BaseURI+"?subOrgId=" + subOrgId)
  }

  getProgramBudgetYearSelectList(subOrgId: string) {
    return this.http.get<SelectList[]>(this.BaseURI + "/programbylist?subOrgId=" + subOrgId)
  }

  CreateBudgetYear(BudgetYear: BudgetYearwithoutId) {
    return this.http.post(this.BaseURI + "/budgetyear", BudgetYear)
  }
  EditBudgetYear(BudgetYear: BudgetYear){
    return this.http.put(this.BaseURI + "/editBudgetYear",BudgetYear)
  }

  DeleteBudgetYear(budgetYearId: string){
    return this.http.delete(this.BaseURI + "/deleteBudgetYear?budgetYearId=" + budgetYearId)
  }
 

  getBudgetYear(value: string) {
    return this.http.get<BudgetYear[]>(this.BaseURI + "/budgetyear?programBudgetYearId=" + value)
  }

  getBudgetYearSelectList(subOrgId: string) {
    return this.http.get<SelectList[]>(this.BaseURI + "/budgetbylist?subOrgId=" + subOrgId)
  }

  getBudgetYearByProgramId (value:string){
    return this.http.get<SelectList[]>(this.BaseURI+"/budgetyearbyprogramid?programId="+value)
  }
}

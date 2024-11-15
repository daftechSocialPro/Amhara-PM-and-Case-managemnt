import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubOrgsPlannedandusedBudgetDtos } from '../analytics';




@Injectable({
    providedIn: 'root',
})
export class AnalyticService {
    constructor(private http: HttpClient) { }
    BaseURI: string = environment.baseUrl + "/Analytics"

    getOverallBudget(){
        return this.http.get<SubOrgsPlannedandusedBudgetDtos>(this.BaseURI + "/getOverallBudget")
    }


}
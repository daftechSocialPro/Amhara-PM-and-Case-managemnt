import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plan, PlanView,PlanSingleview } from './plans';


@Injectable({
    providedIn: 'root',
})
export class PlanService {
    constructor(private http: HttpClient) { }
    BaseURI: string = environment.baseUrl + "/PM/Plan"


    //Plan 

    createPlan(plan: Plan) {
        return this.http.post(this.BaseURI, plan)
    }

    getPlans (programId ?: string){
        if (programId)
        return this.http.get<PlanView[]>(this.BaseURI+"?programId="+programId)
        return this.http.get<PlanView[]>(this.BaseURI)
    }

    getSinglePlans(planId:String){

        return this.http.get<PlanSingleview>(this.BaseURI+"/getbyplanid?planId="+planId)
    }




}
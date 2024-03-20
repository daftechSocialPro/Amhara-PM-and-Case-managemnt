import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plan, PlanView, PlanSingleview } from './plans';
import { ResponseMessage, SelectList } from '../../common/common';


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

    getPlans(subOrgId: string, programId?: string) {
        if (programId)
            return this.http.get<PlanView[]>(this.BaseURI + "?programId=" + programId + "&SubOrgId=" + subOrgId)
        return this.http.get<PlanView[]>(this.BaseURI + "?SubOrgId=" + subOrgId)
    }

    getSinglePlans(planId: String) {

        return this.http.get<PlanSingleview>(this.BaseURI + "/getbyplanid?planId=" + planId)
    }

    getPlanSelectList(programId: String) {

        return this.http.get<SelectList[]>(this.BaseURI + "/getByProgramIdSelectList?programId=" + programId)
    }

    editPlan(plan: Plan) {
        return this.http.put<ResponseMessage>(this.BaseURI + "/editPlan", plan)
    }

    deletePlan(planId: string) {
        return this.http.delete<ResponseMessage>(this.BaseURI + "/deletePlan?planId=" + planId)
    }



}
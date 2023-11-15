import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { environment } from 'src/environments/environment';
import { SelectList } from '../common/common';
import { ActivityDetailDto, SubActivityDetailDto } from './activity-parents/add-activities/add-activities';
import { ComiteeAdd, CommiteeAddEmployeeView, CommitteeView } from './comittes/committee';
import { IPlanReportByProgramDto } from './progress-report/program-budget-report/program-budget-report';
import { IActivityAttachment } from './tasks/Iactivity';
import { ActivityTargetDivisionDto, ActivityView, ApprovalProgressDto, ViewProgressDto } from './view-activties/activityview';
import { IPlanReportDetailDto } from './progress-report/plan-report-today/IplanReportDetai';
import { IPlannedReport } from './progress-report/planned-report/planned-report';
import { FilterationCriteria } from './progress-report/progress-report/Iprogress-report';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class PMService {
    constructor(private http: HttpClient) { }
    BaseURI: string = environment.baseUrl + "/PM"

    //comittee

    createComittee(ComiteeAdd: ComiteeAdd) {

        return this.http.post(this.BaseURI + "/Commite", ComiteeAdd)
    }
    updateComittee(comiteeAdd: ComiteeAdd) {

        return this.http.put(this.BaseURI + "/Commite", comiteeAdd)
    }

    getComittee() {
        return this.http.get<CommitteeView[]>(this.BaseURI + "/Commite")
    }

    getComitteeSelectList() {

        return this.http.get<SelectList[]>(this.BaseURI + "/Commite/getSelectListCommittee")
    }

    getNotIncludedEmployees(CommiteId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/Commite/getNotIncludedEmployees?CommiteId=" + CommiteId)
    }

    addEmployesInCommitee(value: CommiteeAddEmployeeView) {
        return this.http.post(this.BaseURI + "/Commite/addEmployesInCommitee", value)
    }
    removeEmployesInCommitee(value: CommiteeAddEmployeeView) {
        return this.http.post(this.BaseURI + "/Commite/removeEmployesInCommitee", value)
    }

    /// Activity Parent 

    addActivityParent(activity: ActivityDetailDto) {
        return this.http.post(this.BaseURI + "/Activity", activity)
    }

    addSubActivity(activity: SubActivityDetailDto) {
        return this.http.post(this.BaseURI + "/Activity/AddSubActivity", activity)
    }

    addActivityTargetDivision(activityDto: ActivityTargetDivisionDto) {

        return this.http.post(this.BaseURI + "/Activity/targetDivision", activityDto)

    }

    addActivityPorgress(progress: FormData) {

        return this.http.post(this.BaseURI + "/Activity/addProgress", progress)
    }
    viewProgress(activityId: string) {

        return this.http.get<ViewProgressDto[]>(this.BaseURI + "/Activity/viewProgress?actId=" + activityId)
    }

    getAssignedActivities(empId: string) {

        return this.http.get<ActivityView[]>(this.BaseURI + "/Activity/getAssignedActivties?employeeId=" + empId)
    }

    getActivityForApproval(empId: string) {
        return this.http.get<ActivityView[]>(this.BaseURI + "/Activity/forApproval?employeeId=" + empId)
    }


    approveProgress(approvalProgressDto: ApprovalProgressDto) {
        return this.http.post(this.BaseURI + "/Activity/approve", approvalProgressDto)
    }


    getActivityAttachments(taskId: string) {
        return this.http.get<IActivityAttachment[]>(this.BaseURI + "/Activity/getActivityAttachments?taskId=" + taskId)
    }

    //report 
    getDirectorLevelPerformance(BranchId?: string) {

        return this.http.get<TreeNode[]>(this.BaseURI + "/ProgressReport/DirectorLevelPerformance")
    }
    getProgramBudegtReport(BudgetYear: string, ReportBy: string) {

        return this.http.get<IPlanReportByProgramDto>(this.BaseURI + "/ProgressReport/ProgramBudgetReport?BudgetYear=" + BudgetYear + "&ReportBy=" + ReportBy)
    }

    getProgramSelectList() {

        return this.http.get<SelectList[]>(this.BaseURI + "/Program/selectlist")
    }

    getPlanDetailReport(BudgetYear: string, ReportBy: string, ProgramId: string) {

        return this.http.get<IPlanReportDetailDto>(this.BaseURI + "/ProgressReport/plandetailreport?BudgetYear=" + BudgetYear + "&ReportBy=" + ReportBy + "&ProgramId=" + ProgramId)
    }

    getPlannedReport(BudgetYear: string, ReportBy: string, selectStructureId: string) {

        return this.http.get<IPlannedReport>(this.BaseURI + "/ProgressReport/plannedreport?BudgetYea=" + BudgetYear + "&ReportBy=" + ReportBy + "&selectStructureId=" + selectStructureId)

    }


    getByProgramIdSelectList(ProgramId: string) {
        return this.http.get<SelectList[]>(this.BaseURI + "/Plan/getByProgramIdSelectList?ProgramId=" + ProgramId)

    }
    getByTaskIdSelectList(planId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/Task/getByTaskIdSelectList?planId=" + planId)
    }
    getActivitieParentsSelectList(taskId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitieParentsSelectList?taskId=" + taskId)
    }
    GetActivitiesSelectList(planId?: string, taskId?: string, actParentId?: string) {

        if (planId)
            return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitiesSelectList?planId=" + planId)
        if (taskId)
            return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitiesSelectList?taskId=" + taskId)

        return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitiesSelectList?actParentId=" + actParentId)
    }

    GetProgressReport(filterationCriteria: FilterationCriteria) {

        return this.http.post<any>(this.BaseURI + "/ProgressReport/GetProgressReport", filterationCriteria)

    }
    GetProgressReportByStructure(BudgetYear: string, ReportBy: string, selectStructureId: string) {
        return this.http.get<any>(this.BaseURI + "/ProgressReport/GetProgressReportByStructure?BudgetYea=" + BudgetYear + "&ReportBy=" + ReportBy + "&selectStructureId=" + selectStructureId)

    }

    GetPerformanceReport(filterationCriteria: FilterationCriteria) {

        return this.http.post<any>(this.BaseURI + "/ProgressReport/GetPerformanceReport", filterationCriteria)

    }

    GetActivityProgress(activityId: string) {

        return this.http.get<any>(this.BaseURI + "/ProgressReport/GetActivityProgress?activityId=" + activityId)
    }

    GetEstimatedCost(structureId: string, budegtYear: string) {
        return this.http.get<any>(this.BaseURI + "/ProgressReport/GetEstimatedCost?structureId=" + structureId + "&budegtYear=" + budegtYear)
    }

    getComitteEmployees(comitteId: string) {
        return this.http.get<SelectList[]>(this.BaseURI + "/Commite/GetCommiteeEmployees?commiteId=" + comitteId)
    }

}
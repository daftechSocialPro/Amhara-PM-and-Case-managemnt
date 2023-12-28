import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectList } from '../common/common';
import { IAppointmentGet, IAppointmentWithCalander } from './case-detail/make-appointment-case/Iappointmentwithcalander';
import { ICaseState } from './case-detail/transfer-case/IcaseState';
import { ICaseDetailReport, ICaseProgressReport } from './case-report/case-detail-report/Icasedetail';
import { IEmployeePerformance } from './case-report/employee-performance/IEmployeePerformance';
import { ICaseReport, ICaseReportChart } from './case-report/ICaseReport';
import { ISMSReport } from './case-report/sms-report/ISMSReport';
import { CaseType, CaseTypeView, FileSettingView } from './case-type/casetype';
import { ICaseView } from './encode-case/Icase';
import { IUnsentMessage } from './list-of-messages/Imessage';


@Injectable({
    providedIn: 'root',
})
export class CaseService {
    constructor(private http: HttpClient) { }
    BaseURI: string = environment.baseUrl + "/case"
    //caseType
    createCaseType(casetype: CaseType) {

        return this.http.post(this.BaseURI + "/type", casetype)
    }
    getCaseType(subOrgId: string) {
        return this.http.get<CaseTypeView[]>(this.BaseURI + "/type?subOrgId=" + subOrgId)
    }

    getOrderNumber(caseTypeId: string) {

        return this.http.get<number>(this.BaseURI + "/GetChildOrder?caseTypeId=" + caseTypeId)
    }

    getSelectCasetType(subOrgId: string) {
        return this.http.get<SelectList[]>(this.BaseURI + "/typeSelectList?subOrgId=" + subOrgId)
    }

    getCaseTypeByCaseForm(caseForm: string,subOrgId: string) {
        return this.http.get<SelectList[]>(this.BaseURI + "/byCaseForm?caseForm=" + caseForm + "&subOrgId=" + subOrgId)
    }

    //file setting 

    createFileSetting(fileSetting: any) {
        return this.http.post(this.BaseURI + "/fileSetting", fileSetting)
    }
    getFileSetting(subOrgId: string) {
        return this.http.get<FileSettingView[]>(this.BaseURI + "/fileSetting?subOrgId=" + subOrgId)
    }

    getFileSettignsByCaseTypeId(caseTypeId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/fileSettingsByCaseTypeId?CaseTypeId=" + caseTypeId)
    }

    //applicant 

    createApplicant(applicant: any) {
        return this.http.post(this.BaseURI + "/applicant", applicant)
    }

    getApplicantSelectList(subOrgId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/applicantSelectList?subOrgId=" + subOrgId)
    }

    //case
    addCase(caseValue: FormData) {
        return this.http.post(this.BaseURI + "/encoding", caseValue)
    }
    updateCase(caseValue: FormData) {


        return this.http.put(this.BaseURI + "/encoding", caseValue)
    }
    getEncodedCases(userId: string) {
        return this.http.get<ICaseView[]>(this.BaseURI + "/encoding?userId=" + userId)

    }
    getMyCaseList(employeeId: string) {
        return this.http.get<ICaseView[]>(this.BaseURI + "/mycaseList?employeeId=" + employeeId)
    }

    getSearchCases(filterby: string, subOrgId: string) {
        return this.http.get<ICaseView[]>(this.BaseURI + "/searchCases?searchBY=" + filterby + "&subOrgId=" + subOrgId)
    }
    //notification 
    getCasesNotification(employeeId: string) {
        return this.http.get<ICaseView[]>(this.BaseURI + "/getnotification?employeeId=" + employeeId)
    }



    getCaseNumber(subOrgId: string) {
        var HTTPOptions = {
            headers: new HttpHeaders({
                'Accept': 'text'
            }),
            'responseType': 'text' as 'json'
        }
        return this.http.get<string>(this.BaseURI + "/getCaseNumber?subOrgId=" + subOrgId , HTTPOptions)
    }


    //assign case

    assignCase(assigncase: any) {
        return this.http.post(this.BaseURI + "/assign", assigncase)
    }
    raiseIssue(raiseIssue: any) {
        return this.http.post(this.BaseURI + "/CaseIssue", raiseIssue)
    }

    getAllIssue(empId: string) {
        return this.http.get<ICaseView[]>(this.BaseURI + "/CaseIssue?employeeId=" + empId)
    }

    takeActionIssueCase(caseActionDto: any) {

        return this.http.post(this.BaseURI + "/CaseIssue/takeAction", caseActionDto)
    }




    //casetransaction 

    ConfirmTransaction(confirmtracactionDto: any) {
        return this.http.put(this.BaseURI + "/confirm", confirmtracactionDto)

    }
    GetCaseHistories(EmployeeId: string, CaseHistoryId: string) {

        
        return this.http.get<ICaseView[]>(this.BaseURI + "/getHistories?EmployeeId=" + EmployeeId + "&CaseHistoryId=" + CaseHistoryId)
    }

    GetCaseDetail(EmployeeId: string, CaseHistoryId: string) {

        return this.http.get<ICaseView>(this.BaseURI + "/getCaseDetail?EmployeeId=" + EmployeeId + "&CaseHistoryId=" + CaseHistoryId)

    }

    //actions
    AddtoWaiting(caseHistoryId: string) {

        return this.http.post(this.BaseURI + "/waiting?caseHistoryId=" + caseHistoryId, {})
    }
    CompleteCase(completecasedto: any) {

        return this.http.post(this.BaseURI + "/complete", completecasedto)
    }
    RevertCase(reveertcasedto: any) {

        return this.http.post(this.BaseURI + "/revert", reveertcasedto)
    }

    SendSms(smscasedto: any) {

        return this.http.post(this.BaseURI + "/sendSms", smscasedto)
    }
    TransferCase(transferCaseDto: FormData) {

        return this.http.post(this.BaseURI + "/transfer", transferCaseDto)
    }
    AppointCase(appointment: IAppointmentWithCalander) {

        return this.http.post<IAppointmentGet>(this.BaseURI + "/appointmetWithCalender", appointment)
    }

    //
    getAppointment(employeeId: string) {
        return this.http.get<IAppointmentGet[]>(this.BaseURI + "/appointmetWithCalender?employeeId=" + employeeId)
    }

    getMessages(subOrgId: string) {
        return this.http.get<IUnsentMessage[]>(this.BaseURI + "/CaseMessages?subOrgId=" + subOrgId)
    }
    sendUnsentMessages(messages: IUnsentMessage[]) {
        return this.http.post(this.BaseURI + "/CaseMessages", messages)
    }

    //get completed casses to archive 

    getCompletedCases(subOrgId: string) {
        return this.http.get<ICaseView[]>(this.BaseURI + "/completedList?subOrgId=" + subOrgId)
    }

    archiveCase(archive: any) {
        return this.http.post(this.BaseURI + "/archive", archive)
    }

    getArchiveCases(subOrgId: string) {

        return this.http.get<ICaseView[]>(this.BaseURI + "/getArchivedCases?subOrgId=" + subOrgId)
    }


    ///report 

    GetCaseReport(subOrgId: string, startAt?: string, endAt?: string) {

        return this.http.get<ICaseReport[]>(this.BaseURI + "/CaseREport/GetCaseReport?subOrgId="+ subOrgId +"&startAt=" + startAt + "&endAt=" + endAt)
    }

    GetCaseReportChart(subOrgId: string, startAt?: string, endAt?: string) {
        return this.http.get<ICaseReportChart>(this.BaseURI + "/CaseReport/GetCasePieChart?subOrgId="+ subOrgId +"&startAt=" + startAt + "&endAt=" + endAt)
    }

    GetCaseReportChartByStatus(subOrgId: string, startAt?: string, endAt?: string) {

        return this.http.get<ICaseReportChart>(this.BaseURI + "/CaseReport/GetCasePieChartByStatus?subOrgId="+ subOrgId +"&startAt=" + startAt + "&endAt=" + endAt)
    }

    GetCaseEmployeePerformace(subOrgId: string, key: string, OrganizationName : string) {
        return this.http.get<IEmployeePerformance[]>(this.BaseURI + "/CaseReport/GetCaseEmployeePerformace?subOrgId="+ subOrgId +"&key="+key+"&OrganizationName="+OrganizationName)
    }

    GetSMSReport(subOrgId: string, startAt?: string, endAt?: string) {
        return this.http.get<ISMSReport[]>(this.BaseURI + "/CaseReport/GetSMSReport?subOrgId="+ subOrgId +"&startAt=" + startAt + "&endAt=" + endAt)
    }

    GetCaseDetailReport(subOrgId: string) {
        return this.http.get<ICaseDetailReport[]>(this.BaseURI + "/CaseReport/GetCaseDetail?subOrgId=" + subOrgId)
    }


    GetProgresReport(caseId: String) {
        return this.http.get<ICaseProgressReport>(this.BaseURI + "/CaseReport/GetCaseDetailProgress?caseId=" + caseId)
    }

    //get crurrent state in transfer 
    GetCaseState(CaseTypeId: string, historyId: string) {
        return this.http.get<ICaseState>(this.BaseURI + "/GetCaseState?caseTypeId=" + CaseTypeId + '&caseHistoryId=' + historyId)
    }

    IsPermitted(employeeId: string, caseId: string) {
        return this.http.get<boolean>(this.BaseURI + "/Ispermitted?employeeId=" + employeeId + '&caseId=' + caseId)
    }

    GetNotCompletedCases(subOrgId: string) {
        return this.http.get<ICaseView[]>(this.BaseURI + "/CaseIssue/getNotCompletedCases?subOrgId=" + subOrgId)
    }

    RemoveAttachment(attachmentId:string){
        return this.http.get<ICaseView[]>(this.BaseURI+"/removeAttachments?attachmentId="+attachmentId)
    }

    GetSingleCase(caseId:string){

        return this.http.get<ICaseView>(this.BaseURI+"/getCaseById?caseId="+caseId)
    }
 

}




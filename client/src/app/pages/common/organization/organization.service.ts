import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { barChartDto, IDashboardDto } from '../../casedashboard/IDashboard';
import { IPMDashboard } from '../../PM/pm.dashboard';
import { SelectList } from '../common';
import { UnitMeasurment } from '../unit-measurement/unit-measurment';
import { ChangePasswordModel, Employee } from './employee/employee';
import { OrganizationBranch } from './org-branch/org-branch';
import { OrganizationProfile } from './org-profile/org-profile';
import { OrganizationalStructure } from './org-structure/org-structure';
import { SmsTemplateGetDto, SmsTemplatePostDto } from '../sms-template/sms-template';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  //organization
  OrganizationCreate(formData: FormData) {
    return this.http.post(this.BaseURI + "/Organization", formData, { reportProgress: true, observe: 'events' })

  }
  OrganizationUpdate(formData: FormData) {
    return this.http.put(this.BaseURI + "/Organization", formData, { reportProgress: true, observe: 'events' })

  }
  getOrganizationalProfile() {
    return this.http.get<OrganizationProfile>(this.BaseURI + "/Organization")
  }

  //Subsidiary Organization

  CreateSubOrg(formData :any ){
    return this.http.post(this.BaseURI + "/SubOrganization" ,formData)
  }
  GetSubOrgs(){
    return this.http.get(this.BaseURI+"/SubOrganization")
  }

  getSubOrgSelectList(){
    return this.http.get<SelectList[]>(this.BaseURI+ "/SubOrganization/selectlist")
  }

  getSubOrgById(subOrgId: string){
    return this.http.get(this.BaseURI + "/SubOrganization/ById?subOrgId=" + subOrgId)
  }

  // branch
  OrgBranchCreate(orgBranch: OrganizationBranch) {
    return this.http.post(this.BaseURI + "/OrgBranch", orgBranch)
  }
  orgBranchUpdate(orgBranch: OrganizationBranch) {
    return this.http.put(this.BaseURI + "/OrgBranch", orgBranch)
  }

  getOrgBranches(subOrgId: string) {
    return this.http.get<OrganizationalStructure[]>(this.BaseURI + "/OrgBranch?SubOrgId="+subOrgId)
  }

  getOrgBranchSelectList(subOrgId: string) {
    return this.http.get<SelectList[]>(this.BaseURI + "/OrgBranch/branchlist?SubOrgId="+subOrgId)
  }


  //OrgStructure

  OrgStructureCreate(OrgStructure: OrganizationalStructure) {
    
    return this.http.post(this.BaseURI + "/OrgStructure", OrgStructure)
  }
  orgStructureUpdate(OrgStructure: OrganizationalStructure){
    return this.http.put(this.BaseURI + "/OrgStructure", OrgStructure)
  }

  getOrgStructureList(subOrgId:string,branchId : string ) {
    return this.http.get<OrganizationalStructure[]>(this.BaseURI + "/OrgStructure?SubOrgId="+subOrgId+"&BranchId="+branchId)
  }

  getOrgStructureSelectList(branchid: string) {
    return this.http.get<SelectList[]>(this.BaseURI + "/OrgStructure/parentStructures?branchid=" + branchid)
  }

  // employee

  employeeCreate(employee: FormData) {

    return this.http.post(this.BaseURI + "/Employee", employee);

  }
  employeeUpdate(formData: FormData) {
    return this.http.put(this.BaseURI + "/Employee", formData)

  }
  changePassword(formData: ChangePasswordModel)  {
    return this.http.post<string>(this.BaseURI + "/ApplicationUser/ChangePassword", formData)

  }



  getEmployees(subOrgId: string) {
    return this.http.get<Employee[]>(this.BaseURI + "/Employee?subOrgId=" + subOrgId);
  }

  getEmployeesSelectList (subOrgId: string){
    return this.http.get<SelectList[]>(this.BaseURI+"/Employee/selectlist?subOrgId=" + subOrgId)
  }

  getEmployeeNoUserSelectList (subOrgId: string){

    return this.http.get<SelectList[]>(this.BaseURI+"/Employee/selectlistNoUser?subOrgId=" + subOrgId)
  }

  getEmployeesBystructureId (structureId : string ){

    return this.http.get<SelectList[]>(this.BaseURI+"/Employee/byStructureId?StructureId="+structureId)
  }
  //unit of measurment 

  unitOfMeasurmentCreate(unitmeasurment: UnitMeasurment) {
  
    return this.http.post(this.BaseURI + "/UnitOfMeasurment", unitmeasurment)
  }
  unitOfMeasurmentUpdate(unitmeasurment: UnitMeasurment) {
  
    return this.http.put(this.BaseURI + "/UnitOfMeasurment", unitmeasurment)
  }



  getUnitOfMeasurment(subOrgId: string) {
    return this.http.get<UnitMeasurment[]>(this.BaseURI + "/UnitOfMeasurment?subOrgId=" + subOrgId)
  }

  getUnitOfMeasurmentSelectList(subOrgId: string) {
    return this.http.get<SelectList[]>(this.BaseURI + "/UnitOfMeasurment/unitmeasurmentlist?subOrgId=" + subOrgId)
  }

  GetEmployeesById(employeeId : string){

    return this.http.get<Employee>(this.BaseURI+"/Employee/GetEmployeesById?employeeId="+employeeId)
  }

  getDashboardReport (subOrgId:string, startAt?:string ,endAt?:string){

    return this.http.get<IDashboardDto>(this.BaseURI+"/Dashboard/GetDashboardCaseReport?subOrgId=" +subOrgId + "&startAt="+startAt+"&endAt="+endAt)
  }

  getPmDashboardReport (empId:string, subOrgId:string){

    return this.http.get<IPMDashboard>(this.BaseURI+"/Dashboard/GetPMDashboardDto?empId=" + empId + "&subOrgId=" + subOrgId)
  }

  GetPMBarchart(empId:string, subOrgId: string){
    return this.http.get<any>(this.BaseURI+"/Dashboard/GetPMBarchart?empId="+empId+ "&subOrgId=" + subOrgId)
  }

  getDashboardLineChart(subOrgId:string){

    return this.http.get<barChartDto>(this.BaseURI+"/Dashboard/GetMonthlyReportBarChart?subOrgId=" + subOrgId)
  }
  

  getOrgStructureDiagram(branchId:string){
    return this.http.get<TreeNode[]>(this.BaseURI+"/OrgStructure/orgdiagram?BranchId="+branchId)
  }

  
  //SMS Template

  getSmsTemplate(subOrgId:string){
    return this.http.get<SmsTemplateGetDto[]>(this.BaseURI + "/SmsTemplate/GetSmsTemplate?subOrgId="+subOrgId)
  }
  getSmsTemplateById(id:string){
    return this.http.get<SmsTemplateGetDto>(this.BaseURI + "/SmsTemplate/GetSmsTemplateById?id="+id)
  }
  getSmsTemplateSelectList(subOrgId:string){
    return this.http.get<SelectList[]>(this.BaseURI + "/SmsTemplate/GetSmsTemplateSelectList?subOrgId="+subOrgId)
  }
  
  createSmsTemplate(template:SmsTemplatePostDto){
    return this.http.post<any>(this.BaseURI + "/SmsTemplate/CreateSmsTemplate", template )
  }

  updateSmsTemplate(template:SmsTemplateGetDto){
    return this.http.put<any>(this.BaseURI + "/SmsTemplate/UpdateSmsTemplate", template )
  }
  deleteSmsTemplate(id:string){
    return this.http.delete<any>(this.BaseURI + "/SmsTemplate/DeleteSmsTemplate?id="+id )
  }
}


  



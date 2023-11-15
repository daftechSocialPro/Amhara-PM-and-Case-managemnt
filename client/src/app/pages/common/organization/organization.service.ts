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

  // branch
  OrgBranchCreate(orgBranch: OrganizationBranch) {
    return this.http.post(this.BaseURI + "/OrgBranch", orgBranch)
  }
  orgBranchUpdate(orgBranch: OrganizationBranch) {
    return this.http.put(this.BaseURI + "/OrgBranch", orgBranch)
  }

  getOrgBranches() {
    return this.http.get<OrganizationalStructure[]>(this.BaseURI + "/OrgBranch")
  }

  getOrgBranchSelectList() {
    return this.http.get<SelectList[]>(this.BaseURI + "/OrgBranch/branchlist")
  }


  //OrgStructure

  OrgStructureCreate(OrgStructure: OrganizationalStructure) {
    
    return this.http.post(this.BaseURI + "/OrgStructure", OrgStructure)
  }
  orgStructureUpdate(OrgStructure: OrganizationalStructure){
    return this.http.put(this.BaseURI + "/OrgStructure", OrgStructure)
  }

  getOrgStructureList(branchId : string ) {
    return this.http.get<OrganizationalStructure[]>(this.BaseURI + "/OrgStructure?BranchId="+branchId)
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



  getEmployees() {
    return this.http.get<Employee[]>(this.BaseURI + "/Employee");
  }

  getEmployeesSelectList (){
    return this.http.get<SelectList[]>(this.BaseURI+"/Employee/selectlist")
  }

  getEmployeeNoUserSelectList (){

    return this.http.get<SelectList[]>(this.BaseURI+"/Employee/selectlistNoUser")
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



  getUnitOfMeasurment() {
    return this.http.get<UnitMeasurment[]>(this.BaseURI + "/UnitOfMeasurment")
  }

  getUnitOfMeasurmentSelectList() {
    return this.http.get<SelectList[]>(this.BaseURI + "/UnitOfMeasurment/unitmeasurmentlist")
  }

  GetEmployeesById(employeeId : string){

    return this.http.get<Employee>(this.BaseURI+"/Employee/GetEmployeesById?employeeId="+employeeId)
  }

  getDashboardReport (startAt?:string ,endAt?:string){

    return this.http.get<IDashboardDto>(this.BaseURI+"/Dashboard/GetDashboardCaseReport?startAt="+startAt+"&endAt="+endAt)
  }

  getPmDashboardReport (empId:string){

    return this.http.get<IPMDashboard>(this.BaseURI+"/Dashboard/GetPMDashboardDto?empId="+empId)
  }

  GetPMBarchart(empId:string){
    return this.http.get<any>(this.BaseURI+"/Dashboard/GetPMBarchart?empId="+empId)
  }

  getDashboardLineChart(){

    return this.http.get<barChartDto>(this.BaseURI+"/Dashboard/GetMonthlyReportBarChart")
  }
  

  getOrgStructureDiagram(branchId:string){
    return this.http.get<TreeNode[]>(this.BaseURI+"/OrgStructure/orgdiagram?BranchId="+branchId)
  }


  

}

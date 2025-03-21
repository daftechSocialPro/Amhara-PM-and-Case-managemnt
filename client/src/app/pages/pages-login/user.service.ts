import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Token, User, UserView } from './user';
import { ResponseMessage, SelectList } from '../common/common';
import { UserManagment } from '../common/user-management/user-managment';
import { Employee } from '../common/organization/employee/employee';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;


  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    // confirmPswrdCtrl!.errors= {passwordMismatch:true}
    if (confirmPswrdCtrl!.errors == null || 'passwordMismatch' in confirmPswrdCtrl!.errors) {
      if (fb.get('Password')!.value != confirmPswrdCtrl!.value)
        confirmPswrdCtrl!.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl!.setErrors(null);
    }
  }

  register(body: User) {

    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData: User) {
    return this.http.post<any>(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  roleMatch(allowedRoles: any): boolean {
    var isMatch = false;
    var payLoad = jwtDecode<any>(sessionStorage.getItem('token')!)
    //var payLoad = JSON.parse(window.atob(sessionStorage.getItem('token')!.split('.')[1]));
    var userRole:string[] = payLoad.role.split(",");
    allowedRoles.forEach((element: any) => {
      if (userRole.includes(element)) {
        isMatch = true;
        return false;
      }
      else {
        return true;
      }
    });
    return isMatch;
  }

  getRoles (){

    return this.http.get<SelectList[]>(this.BaseURI+'/ApplicationUser/getroles')
  }

  getUserLevel(user: UserView): string {
    if (user.KebeleId) {
      return 'Kebele';
    } else if (user.WoredaId) {
      return 'Woreda';
    } else if (user.ZoneId) {
      return 'Zone';
    }
    return 'Regular'; // Default if no administrative area is assigned
  }

  getCurrentUser() {
    const payLoad = jwtDecode<any>(sessionStorage.getItem('token')!);
    const loginResponse = JSON.parse(sessionStorage.getItem('loginResponse') || '{}');
    console.log('loginResponse',loginResponse.Value);
    let user: UserView = {
      UserID: payLoad.UserID,
      FullName: payLoad.FullName,
      role: payLoad.role.split(","),
      EmployeeId: payLoad.EmployeeId,
      SubOrgId: payLoad.SubsidiaryOrganizationId,
      StrucId: payLoad.StructureId,
      Photo: payLoad.Photo,
      ZoneId: loginResponse?.Value?.data?.zone?.Id,
      ZoneName: loginResponse?.Value?.data?.zone?.Name,
      WoredaId: loginResponse?.Value?.data?.woreda?.Id,
      WoredaName: loginResponse?.Value?.data?.woreda?.Name,
      KebeleId: loginResponse?.Value?.data?.kebele?.Id,
      KebeleName: loginResponse?.Value?.data?.kebele?.Name,
      userLevel: '' // This will be set below
    }
    
    // Set the user level
    user.userLevel = this.getUserLevel(user);
    console.log('user',user);
    return user;
  }

  createUser (body:UserManagment){

    return this.http.post(this.BaseURI+"/ApplicationUser/Register",body)
  }
  updateUser(body:any){

    return this.http.put<ResponseMessage>(this.BaseURI+"/ApplicationUser/EditUser",body)
  }

  getSystemUsers(subOrgId : string){
    return this.http.get<Employee[]>(this.BaseURI+"/ApplicationUser/users?subOrgId=" + subOrgId)
  }

  assignRole(data:any){
    return this.http.post(this.BaseURI + "/ApplicationUser/assignRole",data)

  }
  revokeRole(data:any){
    return this.http.post(this.BaseURI + "/ApplicationUser/revokeRole",data)
  }
  getNotAssignedRoles(userId: string){
    return this.http.get<SelectList[]>(this.BaseURI+'/ApplicationUser/getNotAssignedRole?userId='+userId)

  }
  getAssignedRoles(userId:string){
    return this.http.get<SelectList[]>(this.BaseURI+'/ApplicationUser/getAssignedRoles?userId='+userId)

  }
  changePasswordAdmin(data:any){
    return this.http.post(this.BaseURI + "/ApplicationUser/ChangePasswordAdmin",data)
  }

  deleteUser(userId: string){
    return this.http.delete<ResponseMessage>(this.BaseURI + "/ApplicationUser/DeleteUser?userId="+ userId)
  }
}

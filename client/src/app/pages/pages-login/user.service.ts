import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Token, User, UserView } from './user';
import { SelectList } from '../common/common';
import { UserManagment } from '../common/user-management/user-managment';
import { Employee } from '../common/organization/employee/employee';
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
    var payLoad = JSON.parse(window.atob(sessionStorage.getItem('token')!.split('.')[1]));
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

  getCurrentUser(){
    var payLoad = JSON.parse(window.atob(sessionStorage.getItem('token')!.split('.')[1]));
    let user : UserView={
      UserID : payLoad.UserID,
      FullName: payLoad.FullName,
      role : payLoad.role.split(","),
      EmployeeId:payLoad.EmployeeId,
      SubOrgId : payLoad.SubsidiaryOrganizationId,
      Photo : payLoad.Photo
    }
    console.log(user)
    return user ; 
  }

  createUser (body:UserManagment){

    return this.http.post(this.BaseURI+"/ApplicationUser/Register",body)
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
}

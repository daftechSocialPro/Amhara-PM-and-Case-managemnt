import { SelectList } from "../../common/common";

export interface CommitteeView {

    Id : string ; 
    Name : string ; 
    NoOfEmployees: Number ;
    EmployeeList : SelectList[];
    Remark : string;
}

export interface ComiteeAdd {

    Id?:string;
    Name : string ; 
    Remark : string ;
    CreatedBy? : string ;
  
}

export interface CommiteeAddEmployeeView 
{
    CommiteeId:String;
    EmployeeList:string[];
    CreatedBy:string;
}


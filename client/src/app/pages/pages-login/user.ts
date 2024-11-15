export interface User {

    userName: string ;
    password: string ;
}
export interface UserView {
    FullName : string ; 
    role: string [];
    UserID : string ;
    EmployeeId:string;
    Photo:string;
    SubOrgId:string;
    StrucId:string
}

export interface Token {
    token :string ;
}
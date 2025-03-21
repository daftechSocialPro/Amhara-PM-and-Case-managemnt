export interface User {

    userName: string ;
    password: string ;
}
export interface UserView {
    UserID: string;
    FullName: string;
    role: string[];
    EmployeeId: string;
    SubOrgId: string;
    StrucId: string;
    Photo: string;
    ZoneId?: string;
    ZoneName?: string;
    WoredaId?: string;
    WoredaName?: string;
    KebeleId?: string;
    KebeleName?: string;
    userLevel: string;
}

export interface Token {
    token :string ;
}
export interface Employee {


    Id: string;
    Photo: string;
    Title: string;
    FullName: string;
    Gender: string;
    PhoneNumber: string;
    Position: string;
    StructureId: string;
    StructureName: string;
    BranchId: string;
    BranchName?:string;
    Remark: string
    RowStatus: Number;
    Roles?:string[]
    UserName?: string
    Status?: string
    EmployeeId?: string



}
export interface ChangePasswordModel{
 UserId : string
 CurrentPassword :string
 NewPassword :string
}
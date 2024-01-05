export interface SelectList {

    Id: string;
    Name: string;
    Photo?:string;
    EmployeeId ?: string; 
    CommiteeStatus?: string ;
    
}

export interface ProgramBudgetYear {

    Id: string;
    Name: String;
    FromYear: Number;
    ToYear: Number;
    Remark: String;

}

export interface BudgetYear {

    Id: string;
    ProgramBudgetYearId: string;
    Year: Number;
    FromDate: Date;
    ToDate: Date;
    Remark: String;

}


export interface BudgetYearwithoutId {

    ProgramBudgetYearId: string;
    Year: Number;
    FromDate: Date;
    ToDate: Date;
    Remark: String; 
    CreatedBy: String

}


export interface GetStartEndDate{
    fromDate: string;
    endDate: string;
}
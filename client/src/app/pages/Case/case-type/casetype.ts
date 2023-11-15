export interface CaseType {

    CaseTypeTitle: string,
    Code: string,
    TotalPayment: number,
    Counter: number,
    MeasurementUnit: string,
    CaseForm?: string,
    Remark: string,
    CreatedBy: string,
    OrderNumber?: number,
    ParentCaseTypeId?: string

}

export interface CaseTypeView {
    Id: string
    CaseTypeTitle: string
    Remark: string
    TotalPayment: number
    RowStatus: string
    Code: string
    MeasurementUnit: string
    CreatedBy: string
    CreatedAt: string
    Counter:number
    Children : CaseTypeView[]
    //ParentCaseType?:string
}

export interface FileSettingView {

    Id: string,
    CaseTypeTitle: string,
    Name: string,
    FileType: string,
    RowStatus: string,
    CreatedAt: string,
    CreatedBy: string

}



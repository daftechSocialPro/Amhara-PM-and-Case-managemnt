export interface ICaseReport {

    Id: string
    CaseNumber: string
    CaseType: string
    Subject: string
    IsArchived: string
    OnStructure: string
    OnEmployee: string
    CaseStatus: string
    CreatedDateTime: Date
    CaseCounter: number
    ElapsTime: number
}

export interface ICaseReportChart {
    labels : string [] ; 
    datasets : IDataSets[] ; 
}

export interface IDataSets {
    data : number [] ; 
    backgroundColor : string[] ; 
    hoverBackgroundColor:string []
}



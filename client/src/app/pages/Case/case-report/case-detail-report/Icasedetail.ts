export interface ICaseDetail {
    CaseNumber: string
    Applicant: string
    LetterNumber: string
    SubjecCase: string
    TypeTittle: string
    CaseStatus: string
}

export interface ICaseDetailReport {

    Id: string
    CaseNumber: string
    ApplicantName: string
    LetterNumber: string
    Subject: string
    CaseTypeTitle: string
    CaseTypeStatus: string
    PhoneNumber: string
    Createdat: string
    CaseCounter: number

}

export interface ICaseProgressReport {

    CaseTypeTitle: string
    ApplicationDate: string
    ApplicantName: string
    CaseNumber: string
    LetterNumber: string
    LetterSubject: string

    HistoryProgress: ICaseProgressHistoryReport[]



}

export interface ICaseProgressHistoryReport {
    FromEmployee: string
    ToEmployee: string
    CreatedDate: string
    Seenat: string
    Status: string
    StatusDateTime: string
    ShouldTake: string
    ElapsedTime: string
    ElapseTimeBasedOnSeenTime: string
    EmployeeStatus: string
}
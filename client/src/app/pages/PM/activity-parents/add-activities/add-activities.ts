export interface ActivityDetailDto {

    ActivityDescription:string,
    HasActivity:boolean,
    TaskId:String,
    CreatedBy:string
    ActivityDetails:SubActivityDetailDto[]
    CaseTypeId? : string

}

export interface SubActivityDetailDto {
    Id?:string
    SubActivityDesctiption:string,
    StartDate:string,
    EndDate :string,
    PlannedBudget:number,
    Weight:Number,
    ActivityType?:number,
    OfficeWork?:number,
    FieldWork?:number,
    UnitOfMeasurement? : string,
    UnitOfMeasurementId? : string,
    PreviousPerformance:number,
    Goal:number,
    TeamId?:string,
    CommiteeId?:string,
    PlanId?:string,
    TaskId?:string,
    IsClassfiedToBranch?:Boolean,
    Employees? :string[],
    BranchId?:string,
    KpiGoalId?:string,
    hasKpiGoal?: boolean
}

    
    
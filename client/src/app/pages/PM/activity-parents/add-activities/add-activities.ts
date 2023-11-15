export interface ActivityDetailDto {

    ActivityDescription:string,
    HasActivity:boolean,
    TaskId:String,
    CreatedBy:string
    ActivityDetails:SubActivityDetailDto[]


}

export interface SubActivityDetailDto {
    SubActivityDesctiption:string,
    StartDate:string,
    EndDate :string,
    PlannedBudget:number,
    Weight:Number,
    ActivityType:number,
    OfficeWork:number,
    FieldWork:number,
    UnitOfMeasurement : string,
    PreviousPerformance:number,
    Goal:number,
    TeamId:string,
    CommiteeId:string,
    PlanId?:string,
    TaskId?:string,
    Employees :string[]
}

    
    
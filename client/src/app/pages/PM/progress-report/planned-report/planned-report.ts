
export interface IPlannedReport
{
   PlansLst : IPlansLst[]
   pMINT : number
   planDuration : QuarterMonth[]
}

export interface QuarterMonth
{
   MonthName :string

}
export interface IPlansLst
{
    PlanName : string
    Weight : number
    PlRemark : string
    HasTask : boolean
    Begining? : number
    Target ?: number
    ActualWorked? : number
    Progress : number
    MeasurementUnit : string
    taskLsts : ITaskLst[]
    PlanDivision : IPlanOcc[]
}

export interface ITaskLst
{
    TaskDescription : string
    TaskWeight : number
    TRemark : string
    HasActParent : boolean
    Begining? : number
    Target? : number
    ActualWorked? : number
    MeasurementUnit : string
    Progress ?: number
    ActParentLst : IActParentLst[]
    TaskDivisions : IPlanOcc[]
}

export interface IActParentLst
{
    ActParentDescription : string
    ActParentWeight? : number
    ActpRemark : string
    MeasurementUnit : string
    Begining? : number
    Target? : number
    ActualWorked? : number
    Progress ?: number
    activityLsts : IActivityLst[]
    ActDivisions : IPlanOcc[]
}
export interface IActivityLst
{
     ActivityDescription : string
     Weight : number
     MeasurementUnit : string
     Begining : number
     Target : number
     Remark : string
     ActualWorked : number
     Progress : number
     Plans : IPlanOcc[]
}

export interface IPlanOcc
{
    PlanTarget? : number
    ActualWorked? : number
    Percentile? : number
}
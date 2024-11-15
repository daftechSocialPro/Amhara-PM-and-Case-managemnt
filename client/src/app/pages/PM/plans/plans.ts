import { TaskView } from "../tasks/task"

export interface Plan {
    Id?:string
    BudgetYearId: string
    HasTask: Boolean
    PlanName: string
    PlanWeight: Number
    PlandBudget: Number
    ProgramId: string
    ProjectType: string
    Remark: string
    StructureId: string;
    ProjectManagerId: string;
    FinanceId: string;
    ProjectFunder:string

}


export interface PlanView {

    Id : string,
    PlanName: string,
    PlanWeight: Number,
    PlandBudget: Number,
    RemainingBudget: Number,
    ProjectManager: string,
    FinanceManager: string,
    Director: string,
    StructureName: string,
    ProjectType: string,
    NumberOfTask: number,
    NumberOfActivities: number,
    NumberOfTaskCompleted: number,
    HasTask:Number,
    //
    BudgetYearId?: string
    ProgramId?: string
    Remark?: string
    StructureId?: string;
    ProjectManagerId?: string;
    FinanceId?: string;
    ProjectFunder?:string
    BranchId?:string



}

export interface PlanSingleview {
    Id:string,
    PlanName:string,
    PlanWeight:number,
    RemainingWeight:number,
    PlannedBudget:number,
    RemainingBudget:number,
    StartDate:Date,
    EndDate:Date
    Tasks :TaskView[],
    StructureId?: string

}



  




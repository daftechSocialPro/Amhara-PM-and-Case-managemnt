import { SelectList } from "../../common/common"
import { ActivityView } from "../view-activties/activityview"

export interface Task {
    TaskDescription: string,
    HasActvity: Boolean,
    PlannedBudget: Number,
    PlanId: string,
}

export interface TaskView {
    Id?: string
    TaskName?: string
    TaskWeight?: number
    RemianingWeight: number
    NumberofActivities?: number
    FinishedActivitiesNo?: number
    TerminatedActivitiesNo?: number
    StartDate?: Date
    EndDate?: Date
    NumberOfMembers?: number
    HasActivity?: Boolean
    PlannedBudget?: number
    RemainingBudget: number
    NumberOfFinalized?: number
    NumberOfTerminated?: number
    TaskMembers?: SelectList[]
    TaskMemos?: TaskMemoView[]
    ActivityViewDtos?: ActivityView[]
}

export interface TaskMembers {
    Employee: SelectList[];
    TaskId: string;
    RequestFrom: string;
}


export interface TaskMemoView {
    Employee: SelectList
    Description: string
    DateTime: string
}
export interface TaskMemo {
    EmployeeId: string,
    Description: string,
    TaskId: string
}
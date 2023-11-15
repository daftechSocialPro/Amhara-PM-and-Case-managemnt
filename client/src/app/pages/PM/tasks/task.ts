import { SelectList } from "../../common/common"
import { ActivityView } from "../view-activties/activityview"

export interface Task {
    TaskDescription: String,
    HasActvity: Boolean,
    PlannedBudget: Number,
    PlanId: String,
}

export interface TaskView {
    Id?: String
    TaskName?: String
    TaskWeight?: number
    RemianingWeight?: number
    NumberofActivities?: number
    FinishedActivitiesNo?: number
    TerminatedActivitiesNo?: number
    StartDate?: Date
    EndDate?: Date
    NumberOfMembers?: number
    HasActivity?: Boolean
    PlannedBudget?: number
    RemainingBudget?: number
    NumberOfFinalized?: number
    NumberOfTerminated?: number
    TaskMembers?: SelectList[]
    TaskMemos?: TaskMemoView[]
    ActivityViewDtos?: ActivityView[]
}

export interface TaskMembers {
    Employee: SelectList[];
    TaskId: String;
    RequestFrom: String;
}


export interface TaskMemoView {
    Employee: SelectList
    Description: String
    DateTime: string
}
export interface TaskMemo {
    EmployeeId: String,
    Description: String,
    TaskId: String
}
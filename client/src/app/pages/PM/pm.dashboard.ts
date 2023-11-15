export interface IPMDashboard {
   CountPrograms :number

   CountBudget :number
    
   CountUsedBudget :number
    
   TotalProjects :number
    
   TotalContribution :number
    
   BudgetYear :number

   ProjectLists:IProjectList[]
   AboutToExpireProjects  :IAboutToExpireProjects[]

}

export interface IProjectList
{
     ProjectName :string
     DirectorateName :string
     ProjectProgress :number
     OverallProgress :number
     ProjectDuration :number
     Weight :number
}


export interface IAboutToExpireProjects
{
    DirectorName :string
    ProjectName :string
    TaskName :string
    ActivityName :string
    RequiredAchivement :number
    CurrentAchivement :number
    PlanMonthName :string
    activityId :string
    TaskId :string
    programName :string
}



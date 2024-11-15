export interface OverallBudgetDto{
    SubOrganiztionName: string
    SubOrganizationBudget: string
}

export interface SubOrgsPlannedandusedBudgetDtos{
    PlannedBudget: OverallBudgetDto[]
    Usedbudget: OverallBudgetDto[]
}
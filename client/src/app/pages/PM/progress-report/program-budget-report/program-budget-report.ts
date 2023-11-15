export interface IPlanReportByProgramDto {
    ProgramViewModels: IProgramViewModel[]
    MonthCounts: IFiscalPlanProgram[]
}
export interface IProgramViewModel {
    ProgramName: string
    ProgramPlanViewModels: IProgramPlanViewModel[]
}

export interface IProgramPlanViewModel {

    ProgramName: string
    PlanNAme: string
    MeasurementUnit: string
    TotalGoal: number
    TotalBirr: number
    FiscalPlanPrograms: IFiscalPlanProgram[]

}

export interface IFiscalPlanProgram {
    PlanNAme: string
    RowORder: number
    MonthName: string
    fisicalValue: number
    FinancialValue: number

}
export interface KpiGetDto {
  Id : string;
  KpiDetails : GroupedKPIDetailsGetDto[];
  Title : string;
  StartYear : number;
  ActiveYears : number[];
  EncoderOrganizationName: string;
  EvaluatorOrganizationName : string;
  Url? : string;
  CreatedBy : string
  SubsidiaryOrganizationId: string
  HasSubsidiaryOrganization: boolean
}

export interface GroupedKPIDetailsGetDto {
  MainGoal: string
  MainGoalId?: string
  Details: KpiDetailItem[]
}

export interface KpiDetailItem {
  Id: string;
  KPIId: number;
  Title: string;
  StartYearProgress: number
  MainGoal: string;
  CreatedBy: string | null;
  KPIDatas: KpiData[];
}
export interface KpiData{
  Id : string
  Year: number
  Data: string
}

export interface KpiDataPost{
  KPIDetailId: string
  Year: number
  Data: string
  CreatedBy: string
}

export class KpiDetailPost{
  KPIId!: string
  Titles!: SimilarGoals[]
  Goal!: string
  GoalId?:string
  CreatedBy!: string
}

export class KPIGoalPostDto{
  KPIId!: string
  Goal!: string
  CreatedBy!: string
}



export class SimilarGoals
{
    //Goal!: string 
    Title!: string
    StartYearProgress!: number
}



export interface KpiPostDto {
  Title : string;
  StartYear : number;
  ActiveYearsString : string;
  EncoderOrganizationName: string;
  EvaluatorOrganizationName : string;
  CreatedBy : string
  Remark?: string
  SubsidiaryOrganizationId: string
  HasSubsidiaryOrganization: boolean
}

export interface KpiGetWithoutDetailsDto {
  Id: string
  Title : string;
  StartYear : number;
  ActiveYearsString : string;
  EncoderOrganizationName: string;
  EvaluatorOrganizationName : string;
  CreatedBy : string
  Remark?: string
  SubsidiaryOrganizationId: string
  HasSubsidiaryOrganization: boolean
}
       
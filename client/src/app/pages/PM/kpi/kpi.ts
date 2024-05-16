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
}

export interface GroupedKPIDetailsGetDto {
  MainGoal: string
  Details: KpiDetailItem[]
}

export interface KpiDetailItem {
  Id: string;
  KPIId: number;
  Title: string;
  MainGoal: string;
  CreatedBy: string | null;
  KPIDatas: KpiData[];
}
export interface KpiData{
  Id : string
  Year: number
  Data: string
}


export interface KpiPostDto {
  Title : string;
  StartYear : number;
  ActiveYearsString : string;
  EncoderOrganizationName: string;
  EvaluatorOrganizationName : string;
  Url? : string;
  CreatedBy : string
  Remark?: string
}
       
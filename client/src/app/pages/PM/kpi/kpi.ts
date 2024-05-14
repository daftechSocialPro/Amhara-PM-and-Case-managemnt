export interface KpiGETDTO {
  Id : string;
  KpiDetails : KpiDetailItem[];
  Title : string;
  StartYear : number;
  ActiveYears : number;
  EncoderOrganizationName: string;
  EvaluatorOrganizationName : string;
  Url : string;
  CreatedBy : string
}
export interface KpiDetailItem {
  Id: string;
  KPIId: number;
  Title: string;
  MainGoal: string;
  CreatedBy: string | null;
  KPIDatas: any[];
}
export interface KpiPOSTDTO {

}

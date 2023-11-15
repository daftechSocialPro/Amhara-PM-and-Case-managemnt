import { ICaseReportChart } from "../case/case-report/ICaseReport";

export interface IDashboardDto{

    pendingReports : IDashboardView[]
    completedReports :IDashboardView[]
    chart: ICaseReportChart;
}

export interface IDashboardView{
 CaseTypeTitle:string
 ApplicantName :string
 AffairNumber :string
 Subject :string
 Structure :string
 Employee :string
 Elapstime :number
 Level :number
 CreatedDateTime :string

}


export interface barChartDto
{

   labels :string[]
   datasets :barChartDetailDto[]
}

export interface barChartDetailDto
{

     type : string
     label :string
     backgroundColor :string
     data : number[]
}

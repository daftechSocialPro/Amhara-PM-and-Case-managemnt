import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { OrgProfileComponent } from './pages/common/organization/org-profile/org-profile.component';
import { OrgBranchComponent } from './pages/common/organization/org-branch/org-branch.component';
import { OrgStructureComponent } from './pages/common/organization/org-structure/org-structure.component';
import { BudgetYearComponent } from './pages/common/budget-year/budget-year.component';
import { EmployeeComponent } from './pages/common/organization/employee/employee.component';
import { UnitMeasurementComponent } from './pages/common/unit-measurement/unit-measurement.component';
import { ArchiveManagementComponent } from './pages/common/archive-management/archive-management.component';
import { UserManagementComponent } from './pages/common/user-management/user-management.component';
import { ProgramsComponent } from './pages/PM/programs/programs.component';
import { PlansComponent } from './pages/PM/plans/plans.component';
import { TasksComponent } from './pages/PM/tasks/tasks.component';
import { ActivityParentsComponent } from './pages/pm/activity-parents/activity-parents.component';
import { EncodeCaseComponent } from './pages/case/encode-case/encode-case.component';
import { ComittesComponent } from './pages/pm/comittes/comittes.component';
import { AssignedActivitiesComponent } from './pages/pm/assigned-activities/assigned-activities.component';
import { CaseTypeComponent } from './pages/case/case-type/case-type.component';
import { FileSettingComponent } from './pages/case/file-setting/file-setting.component';
import { ActivityforapprovalComponent } from './pages/pm/activityforapproval/activityforapproval.component';
import { MyCaseListComponent } from './pages/case/my-case-list/my-case-list.component';
import { CaseDetailComponent } from './pages/Case/case-detail/case-detail.component';
import { CaseHistoryComponent } from './pages/Case/case-history/case-history.component';
import { CaseAppointmentsComponent } from './pages/case/case-appointments/case-appointments.component';
import { ListOfMessagesComponent } from './pages/case/list-of-messages/list-of-messages.component';

import { ArchivecaseComponent } from './pages/case/archivecase/archivecase.component';
import { CompletedCasesComponent } from './pages/case/completed-cases/completed-cases.component';
import { CaseReportComponent } from './pages/case/case-report/case-report/case-report.component';
import { EmployeePerformanceComponent } from './pages/case/case-report/employee-performance/employee-performance.component';
import { SmsReportComponent } from './pages/case/case-report/sms-report/sms-report.component';
import { CaseDetailReportComponent } from './pages/Case/case-report/case-detail-report/case-detail-report.component';
import { CasedashboardComponent } from './pages/casedashboard/casedashboard.component';
import { RaiseIssueComponent } from './pages/case/encode-case/raise-issue/raise-issue.component';
import { IssuedCaseComponent } from './pages/case/issued-case/issued-case.component';
import { PmDashboardComponent } from './pages/pm/pm-dashboard/pm-dashboard.component';
import { DirectorLevelPerformanceComponent } from './pages/PM/progress-report/director-level-performance/director-level-performance.component';
import { ProgramBudgetReportComponent } from './pages/PM/progress-report/program-budget-report/program-budget-report.component';
import { PlanReportTodayComponent } from './pages/pm/progress-report/plan-report-today/plan-report-today.component';
import { PlannedReportComponent } from './pages/pm/progress-report/planned-report/planned-report.component';
import { ProgressReportComponent } from './pages/pm/progress-report/progress-report/progress-report.component';
import { ProgressReportBystructureComponent } from './pages/pm/progress-report/progress-report-bystructure/progress-report-bystructure.component';
import { PerformanceReportComponent } from './pages/pm/progress-report/performance-report/performance-report.component';
import { EstimatedCoastComponent } from './pages/pm/progress-report/estimated-coast/estimated-coast.component';
import { SearchCasesComponent } from './pages/Case/search-cases/search-cases.component';



const routes: Routes = [


  { path: '', canActivate: [AuthGuard], component: PmDashboardComponent,data:{permittedRoles : ['Super Admin','Director','Employee Manager','Encoder','PM Admin','Planner','Plan Reporting','Case Admin','Member','Secretery','Encoder']} },
  { path: 'pmdashboard', canActivate: [AuthGuard], component: PmDashboardComponent,data:{permittedRoles :['Super Admin','Director','Employee Manager','Encoder','PM Admin','Planner','Plan Reporting','Case Admin','Member','Secretery']} },
  { path: 'orgprofile', canActivate: [AuthGuard], component: OrgProfileComponent,data:{permittedRoles : ['Super Admin','Employee Manager']} },
  { path: 'orgbranch', canActivate: [AuthGuard], component: OrgBranchComponent,data:{permittedRoles : ['Super Admin','Employee Manager']}  },
  { path: 'orgstructure', canActivate: [AuthGuard], component: OrgStructureComponent ,data:{permittedRoles : ['Super Admin','Employee Manager']}  },
  { path: 'budgetyear', canActivate: [AuthGuard], component: BudgetYearComponent,data:{permittedRoles : ['Super Admin','Case Admin','PM Admin']} },
  { path: 'employee', canActivate: [AuthGuard], component: EmployeeComponent ,data:{permittedRoles : ['Super Admin','Employee Manager']}  },
  { path: 'unitmeasurment', canActivate: [AuthGuard], component: UnitMeasurementComponent,data:{permittedRoles : ['Super Admin','Case Admin','PM Admin']} },
  { path: 'archive', canActivate: [AuthGuard], component: ArchiveManagementComponent,data :{permittedRoles:['Super Admin','Case Admin','PM Admin'] }},

  { path: 'usermanagement', canActivate: [AuthGuard], component: UserManagementComponent,data:{permittedRoles : ['Super Admin','Employee Manager']} },
  { path: 'program', canActivate:[AuthGuard],component:ProgramsComponent,data:{permittedRoles: ['Super Admin','Director','PM Admin','Planner','Plan Reporting']}},
  { path: 'plan', canActivate:[AuthGuard],component:PlansComponent,data:{permittedRoles: ['Super Admin','Director','PM Admin','Planner','Plan Reporting']}},
  { path: 'task',canActivate:[AuthGuard],component:TasksComponent,data:{permittedRoles: ['Super Admin','Director','PM Admin','Planner','Plan Reporting']}},  
  { path: 'activityparent', canActivate:[AuthGuard],component:ActivityParentsComponent ,data:{permittedRoles:['Super Admin','Director','Employee Manager','PM Admin','Planner','Plan Reporting','Case Admin','Member','Secretery','Encoder']}},
  { path: 'encodecase' ,canActivate:[AuthGuard],component : EncodeCaseComponent,data:{permittedRoles : ['Super Admin','Case Admin','Encoder']}},
  { path: 'searchcase' ,canActivate:[AuthGuard],component : SearchCasesComponent,data:{permittedRoles : ['Super Admin','Case Admin','Encoder']}},
 
 
 
  { path: 'issuedcase' ,canActivate:[AuthGuard],component : IssuedCaseComponent ,data:{permittedRoles : ['Super Admin','Case Admin','Encoder','Director']}},
  
  { path: 'comittee' ,canActivate : [AuthGuard],component: ComittesComponent,data:{permittedRoles : ['Super Admin','Director','PM Admin','Planner','Plan Reporting']}},
  { path: 'assignedactivities' , canActivate:[AuthGuard], component: AssignedActivitiesComponent ,data:{permittedRoles:['Super Admin','Director','Employee Manager','Encoder','PM Admin','Planner','Plan Reporting','Case Admin','Member','Secretery','Encoder']} },
  { path: 'casetype' ,canActivate:[AuthGuard],component : CaseTypeComponent,data:{permittedRoles : ['Super Admin','Case Admin']}},
  { path: 'filesetting' ,canActivate:[AuthGuard],component : FileSettingComponent,data:{permittedRoles : ['Super Admin','Case Admin']}},
  { path: 'actForApproval' ,canActivate:[AuthGuard],component : ActivityforapprovalComponent,data:{permittedRoles:['Super Admin','Director','Encoder','PM Admin','Planner','Plan Reporting','Case Admin','Member','Secretery',]}},
  { path: 'mycaselist', canActivate:[AuthGuard], component:MyCaseListComponent,data:{permittedRoles:['Super Admin','Case Admin','Encoder','Director','Member','Secretery','Employee Manager']}},
  { path: 'casedetail',canActivate:[AuthGuard],component:CaseDetailComponent,data:{permittedRoles : ['Super Admin','Case Admin','Encoder','Director','Member','Secretery','Employee Manager']}},
  { path: 'caseHistory',canActivate:[AuthGuard],component:CaseHistoryComponent,data:{permittedRoles : ['Super Admin','Case Admin','Encoder','Director','Member','Secretery','Employee Manager']}},
  
  { path: 'caseappointments',canActivate:[AuthGuard],component:CaseAppointmentsComponent,data:{permittedRoles : ['Super Admin','Case Admin','Encoder','Director','Member','Secretery','Employee Manager']}},
  { path: 'listmessages',canActivate:[AuthGuard],component:ListOfMessagesComponent,data:{permittedRoles : ['Super Admin','Director','Case Admin']}},
  { path: 'completedCases', canActivate:[AuthGuard],component: CompletedCasesComponent,data:{permittedRoles : ['Super Admin','Case Admin','Director']}},
  { path: 'archivecase', canActivate:[AuthGuard],component: ArchivecaseComponent, data : {permittedRoles:['Super Admin','Case Admin','Director']}},



  
//report 
{ path: 'casereport', canActivate:[AuthGuard],component: CaseReportComponent,data:{permittedRoles : ['Super Admin','Director','Case Admin']}},
{ path: 'empperformance', canActivate:[AuthGuard], component: EmployeePerformanceComponent,data:{permittedROels : ['Super Admin','Director','Case Admin','Member','Secretery','Employee Manager','Encoder']} },
{ path: 'smsreport', canActivate:[AuthGuard], component : SmsReportComponent,data : {permittedRoles:['Super Admin','Director','Case Admin','Secretery']}},
{ path: 'casedetailreport', canActivate:[AuthGuard],component: CaseDetailReportComponent,data:{permittedRoles : ['Super Admin','Director','Case Admin']}},
{ path: 'user-profile',canActivate:[AuthGuard], component: UsersProfileComponent },
{ path: 'casedashboard',canActivate:[AuthGuard], component: CasedashboardComponent,data:{permittedRoles:['Super Admin','Case Admin','Encoder','Director','Member','Secretery','Employee Manager','PM Admin','Planner','Plan Reporting']} },


//Pm report 
{ path: 'directorlevelperformance',canActivate:[AuthGuard], component: DirectorLevelPerformanceComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },
{ path: 'programbudgetreport',canActivate:[AuthGuard], component: ProgramBudgetReportComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },
{ path: 'planreportdetail',canActivate:[AuthGuard], component: PlanReportTodayComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },
{ path: 'plannedreport',canActivate:[AuthGuard], component: PlannedReportComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },
{ path: 'progressreport',canActivate:[AuthGuard], component: ProgressReportComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },


{ path: 'progressreportbystructure',canActivate:[AuthGuard], component: ProgressReportBystructureComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },

{ path: 'performancereport',canActivate:[AuthGuard], component: PerformanceReportComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },

{ path: 'estimatedcoast',canActivate:[AuthGuard], component: EstimatedCoastComponent ,data:{permittedRoles:['Super Admin','PM Admin','Director']} },


  { path: 'alerts', component: AlertsComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'charts-apexcharts', component: ChartsApexchartsComponent },
  { path: 'charts-chartjs', component: ChartsChartjsComponent },
  { path: 'form-editors', component: FormsEditorsComponent },
  { path: 'form-elements', component: FormsElementsComponent },
  { path: 'form-layouts', component: FormsLayoutsComponent },
  { path: 'icons-bootstrap', component: IconsBootstrapComponent },
  { path: 'icons-boxicons', component: IconsBoxiconsComponent },
  { path: 'icons-remix', component: IconsRemixComponent },
  { path: 'list-group', component: ListGroupComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'spinners', component: SpinnersComponent },
  { path: 'tables-data', component: TablesDataComponent },
  { path: 'tables-general', component: TablesGeneralComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faemploye', component: PagesFaqComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

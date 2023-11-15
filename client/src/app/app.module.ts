import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderIneterceptor } from './http-interceptors/auth-header-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { OrgProfileComponent } from './pages/common/organization/org-profile/org-profile.component';
import { OrgBranchComponent } from './pages/common/organization/org-branch/org-branch.component';
import { OrgStructureComponent } from './pages/common/organization/org-structure/org-structure.component';
import { BudgetYearComponent } from './pages/common/budget-year/budget-year.component';
import { AddBranchComponent } from './pages/common/organization/org-branch/add-branch/add-branch.component';
import { AddStructureComponent } from './pages/common/organization/org-structure/add-structure/add-structure.component';
import { AddProgrambudgetyearComponent } from './pages/common/budget-year/add-programbudgetyear/add-programbudgetyear.component';
import { AddBudgetyearComponent } from './pages/common/budget-year/add-budgetyear/add-budgetyear.component';
import { EmployeeComponent } from './pages/common/organization/employee/employee.component';
import { EmployeeDetailsComponent } from './pages/common/organization/employee/employee-details/employee-details.component';
import { AddEmployeesComponent } from './pages/common/organization/employee/add-employees/add-employees.component';
import { UpdateEmployeeComponent } from './pages/common/organization/employee/update-employee/update-employee.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UnitMeasurementComponent } from './pages/common/unit-measurement/unit-measurement.component';

import { ProgramByDetailsComponent } from './pages/common/budget-year/program-by-details/program-by-details.component';
import { ArchiveManagementComponent } from './pages/common/archive-management/archive-management.component';
import { AddShelfComponent } from './pages/common/archive-management/add-shelf/add-shelf.component';
import { UpdateBranchComponent } from './pages/common/organization/org-branch/update-branch/update-branch.component';
import { UpdateStructureComponent } from './pages/common/organization/org-structure/update-structure/update-structure.component';
import { AddMeasurementComponent } from './pages/common/unit-measurement/add-measurement/add-measurement.component';
import { UpdateMeasurmentComponent } from './pages/common/unit-measurement/update-measurment/update-measurment.component';
import { UserManagementComponent } from './pages/common/user-management/user-management.component';
import { AddUsersComponent } from './pages/common/user-management/add-users/add-users.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ProgramsComponent } from './pages/PM/programs/programs.component';
import { AddProgramsComponent } from './pages/PM/programs/add-programs/add-programs.component';
import { PlansComponent } from './pages/PM/plans/plans.component';
import { AddPlansComponent } from './pages/PM/plans/add-plans/add-plans.component';
import { TasksComponent } from './pages/PM/tasks/tasks.component';
import { AddTasksComponent } from './pages/PM/tasks/add-tasks/add-tasks.component';
import { ActivityParentsComponent } from './pages/pm/activity-parents/activity-parents.component';
import { AddActivitiesComponent } from './pages/pm/activity-parents/add-activities/add-activities.component';
import { EncodeCaseComponent } from './pages/case/encode-case/encode-case.component';
import { AddCaseComponent } from './pages/case/encode-case/add-case/add-case.component';
import { ComittesComponent } from './pages/pm/comittes/comittes.component';
import { AddComiteeComponent } from './pages/pm/comittes/add-comitee/add-comitee.component';
import { CommitteeEmployeeComponent } from './pages/pm/comittes/committee-employee/committee-employee.component';
import { UpdateCpmmitteeComponent } from './pages/pm/comittes/update-cpmmittee/update-cpmmittee.component';
import { AssignedActivitiesComponent } from './pages/pm/assigned-activities/assigned-activities.component';
import { ViewActivtiesComponent } from './pages/pm/view-activties/view-activties.component';
import { AssignCaseComponent } from './pages/Case/encode-case/assign-case/assign-case.component';

import { CaseListPageComponent } from './pages/Case/case-list-page/case-list-page.component';
import { CaseHistoryComponent } from './pages/Case/case-history/case-history.component';
import { CaseDetailComponent } from './pages/Case/case-detail/case-detail.component';
import { ActivityTargetComponent } from './pages/pm/view-activties/activity-target/activity-target.component';
import { AddProgressComponent } from './pages/PM/view-activties/add-progress/add-progress.component';
import { ViewProgressComponent } from './pages/pm/view-activties/view-progress/view-progress.component';
import { ActivityforapprovalComponent } from './pages/pm/activityforapproval/activityforapproval.component';
import { AcceptRejectComponent } from './pages/pm/view-activties/view-progress/accept-reject/accept-reject.component';
import { AddCaseTypeComponent } from './pages/case/case-type/add-case-type/add-case-type.component';
import { CaseTypeComponent } from './pages/case/case-type/case-type.component';
import { AddFileSettingComponent } from './pages/case/file-setting/add-file-setting/add-file-setting.component';
import { FileSettingComponent } from './pages/case/file-setting/file-setting.component';
import { AddApplicantComponent } from './pages/Case/encode-case/add-applicant/add-applicant.component';
import { MyCaseListComponent } from './pages/case/my-case-list/my-case-list.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { HistoryCardComponent } from './pages/case/case-history/history-card/history-card.component';
import { TransferCaseComponent } from './pages/Case/case-detail/transfer-case/transfer-case.component';

import { CompleteCaseComponent } from './pages/Case/case-detail/complete-case/complete-case.component';
import { MakeAppointmentCaseComponent } from './pages/Case/case-detail/make-appointment-case/make-appointment-case.component';
import { SendSmsComponent } from './pages/Case/case-detail/send-sms/send-sms.component';
import { GojsAngularModule } from 'gojs-angular';
import { ListOfMessagesComponent } from './pages/case/list-of-messages/list-of-messages.component';
import { CaseAppointmentsComponent } from './pages/case/case-appointments/case-appointments.component';
import { ArchivecaseComponent } from './pages/case/archivecase/archivecase.component';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { AddRowComponent } from './pages/common/archive-management/add-row/add-row.component';
import { AddFolderComponent } from './pages/common/archive-management/add-folder/add-folder.component';
import { CompletedCasesComponent } from './pages/case/completed-cases/completed-cases.component';
import { ArchiveCaseActionComponent } from './pages/case/archivecase/archive-case-action/archive-case-action.component';

import { LightgalleryModule } from 'lightgallery/angular';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { AddCaseChildComponent } from './pages/case/case-type/add-case-child/add-case-child.component';
import { CaseReportComponent } from './pages/case/case-report/case-report/case-report.component';
import { CaseDetailReportComponent } from './pages/Case/case-report/case-detail-report/case-detail-report.component';

import {ChartModule} from 'primeng/chart';
import { EmployeePerformanceComponent } from './pages/case/case-report/employee-performance/employee-performance.component';
import { SmsReportComponent } from './pages/case/case-report/sms-report/sms-report.component';
import { DetailReportComponent } from './pages/Case/case-report/case-detail-report/detail-report/detail-report.component';
import { CasedashboardComponent } from './pages/casedashboard/casedashboard.component';
//

import { OrganizationChartModule } from 'primeng/organizationchart';
import { RaiseIssueComponent } from './pages/case/encode-case/raise-issue/raise-issue.component';
import { IssuedCaseComponent } from './pages/case/issued-case/issued-case.component';
import { PmDashboardComponent } from './pages/pm/pm-dashboard/pm-dashboard.component';
import { DirectorLevelPerformanceComponent } from './pages/PM/progress-report/director-level-performance/director-level-performance.component';
import { ProgramBudgetReportComponent } from './pages/PM/progress-report/program-budget-report/program-budget-report.component';
import { PlanReportTodayComponent } from './pages/pm/progress-report/plan-report-today/plan-report-today.component';
import { PlannedReportComponent } from './pages/pm/progress-report/planned-report/planned-report.component';
import { ProgressReportComponent } from './pages/pm/progress-report/progress-report/progress-report.component';
import { EstimatedCoastComponent } from './pages/pm/progress-report/estimated-coast/estimated-coast.component';
import { PerformanceReportComponent } from './pages/pm/progress-report/performance-report/performance-report.component';
import { ProgressReportBystructureComponent } from './pages/pm/progress-report/progress-report-bystructure/progress-report-bystructure.component';
import { GetActivityProgressComponent } from './pages/PM/progress-report/performance-report/get-activity-progress/get-activity-progress.component';
import { ShowonmapComponent } from './pages/PM/progress-report/performance-report/showonmap/showonmap.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { NgImageSliderModule } from 'ng-image-slider';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { CarouselModule } from 'primeng/carousel';
import { ViewPdfComponent } from './pages/Case/case-detail/view-pdf/view-pdf.component';
import { SearchCasesComponent } from './pages/Case/search-cases/search-cases.component';
import { UpdateCaseComponent } from './pages/Case/encode-case/update-case/update-case.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    SpinnerComponent,
    OrgProfileComponent,
    OrgBranchComponent,
    OrgStructureComponent,
    BudgetYearComponent,
    AddBranchComponent,
    AddStructureComponent,
    AddProgrambudgetyearComponent,
    AddBudgetyearComponent,
    EmployeeComponent,
    EmployeeDetailsComponent,
    AddEmployeesComponent,
    UpdateEmployeeComponent,
    UnitMeasurementComponent,
    ProgramByDetailsComponent,
    ArchiveManagementComponent,
    AddShelfComponent,
    UpdateBranchComponent,
    UpdateStructureComponent,
    AddMeasurementComponent,
    UpdateMeasurmentComponent,
    UserManagementComponent,
    AddUsersComponent,
    AutocompleteComponent,
    ProgramsComponent,
    AddProgramsComponent,
    PlansComponent,
    AddPlansComponent,
    TasksComponent,
    AddTasksComponent,
    ActivityParentsComponent,
    AddActivitiesComponent,
    EncodeCaseComponent,
    AddCaseComponent,
    AddCaseTypeComponent,
    ComittesComponent,
    AddComiteeComponent,
    CommitteeEmployeeComponent,
    UpdateCpmmitteeComponent,
    AssignedActivitiesComponent,
    ViewActivtiesComponent,
    AssignCaseComponent,

    CaseListPageComponent,
    CaseHistoryComponent,
    CaseDetailComponent,
    ActivityTargetComponent,
    AddProgressComponent,
    ViewProgressComponent,
    ActivityforapprovalComponent,
    AcceptRejectComponent,
    CaseTypeComponent,
    AddFileSettingComponent,
    FileSettingComponent,
    AddApplicantComponent,
    AddCaseComponent,
    MyCaseListComponent,
    ConfirmationDialogComponent,
    HistoryCardComponent,
    TransferCaseComponent,

    CompleteCaseComponent,
    MakeAppointmentCaseComponent,
    SendSmsComponent,
    ListOfMessagesComponent,
    CaseAppointmentsComponent,
    ArchivecaseComponent,
    AddRowComponent,
    AddFolderComponent,
    CompletedCasesComponent,
    ArchiveCaseActionComponent,
    AddCaseChildComponent,
    CaseReportComponent,
    EmployeePerformanceComponent,
    SmsReportComponent,
    CaseDetailReportComponent,
    DetailReportComponent,
    CasedashboardComponent,
    RaiseIssueComponent,
    IssuedCaseComponent,
    PmDashboardComponent,
    DirectorLevelPerformanceComponent,
    ProgramBudgetReportComponent,
    PlanReportTodayComponent,
    PlannedReportComponent,
    ProgressReportComponent,
    EstimatedCoastComponent,
    PerformanceReportComponent,
    ProgressReportBystructureComponent,
    GetActivityProgressComponent,
    ShowonmapComponent,
    ScannerComponent,
    PdfViewerComponent,
    ViewPdfComponent,
    SearchCasesComponent,
    UpdateCaseComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,   
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModalModule,
    AutocompleteLibModule,
    NgImageSliderModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    NgbModule,
    LightgalleryModule,
    GojsAngularModule,
    Angular2ImageGalleryModule,
    HammerModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ChartModule,
    OrganizationChartModule,
    PdfViewerModule,
    CarouselModule,
    NgxPaginationModule
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderIneterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

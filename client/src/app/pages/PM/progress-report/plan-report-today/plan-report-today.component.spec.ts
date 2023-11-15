import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanReportTodayComponent } from './plan-report-today.component';

describe('PlanReportTodayComponent', () => {
  let component: PlanReportTodayComponent;
  let fixture: ComponentFixture<PlanReportTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanReportTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanReportTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

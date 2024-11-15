import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramBudgetReportComponent } from './program-budget-report.component';

describe('ProgramBudgetReportComponent', () => {
  let component: ProgramBudgetReportComponent;
  let fixture: ComponentFixture<ProgramBudgetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramBudgetReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramBudgetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

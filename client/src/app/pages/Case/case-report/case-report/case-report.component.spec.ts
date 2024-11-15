import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseReportComponent } from './case-report.component';

describe('CaseReportComponent', () => {
  let component: CaseReportComponent;
  let fixture: ComponentFixture<CaseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

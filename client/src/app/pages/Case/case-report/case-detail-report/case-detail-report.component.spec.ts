import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetailReportComponent } from './case-detail-report.component';

describe('CaseDetailReportComponent', () => {
  let component: CaseDetailReportComponent;
  let fixture: ComponentFixture<CaseDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseDetailReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedReportComponent } from './planned-report.component';

describe('PlannedReportComponent', () => {
  let component: PlannedReportComponent;
  let fixture: ComponentFixture<PlannedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

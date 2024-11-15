import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressReportBystructureComponent } from './progress-report-bystructure.component';

describe('ProgressReportBystructureComponent', () => {
  let component: ProgressReportBystructureComponent;
  let fixture: ComponentFixture<ProgressReportBystructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressReportBystructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressReportBystructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

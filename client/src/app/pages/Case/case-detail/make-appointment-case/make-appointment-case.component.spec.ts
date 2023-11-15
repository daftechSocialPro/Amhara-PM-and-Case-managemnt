import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAppointmentCaseComponent } from './make-appointment-case.component';

describe('MakeAppointmentCaseComponent', () => {
  let component: MakeAppointmentCaseComponent;
  let fixture: ComponentFixture<MakeAppointmentCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAppointmentCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeAppointmentCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeEmployeeComponent } from './committee-employee.component';

describe('CommitteeEmployeeComponent', () => {
  let component: CommitteeEmployeeComponent;
  let fixture: ComponentFixture<CommitteeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

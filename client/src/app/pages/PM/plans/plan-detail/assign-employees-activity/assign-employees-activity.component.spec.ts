import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeesActivityComponent } from './assign-employees-activity.component';

describe('AssignEmployeesActivityComponent', () => {
  let component: AssignEmployeesActivityComponent;
  let fixture: ComponentFixture<AssignEmployeesActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEmployeesActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignEmployeesActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

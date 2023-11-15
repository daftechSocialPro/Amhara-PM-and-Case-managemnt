import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedActivitiesComponent } from './assigned-activities.component';

describe('AssignedActivitiesComponent', () => {
  let component: AssignedActivitiesComponent;
  let fixture: ComponentFixture<AssignedActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

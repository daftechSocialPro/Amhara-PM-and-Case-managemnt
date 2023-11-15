import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityforapprovalComponent } from './activityforapproval.component';

describe('ActivityforapprovalComponent', () => {
  let component: ActivityforapprovalComponent;
  let fixture: ComponentFixture<ActivityforapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityforapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityforapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

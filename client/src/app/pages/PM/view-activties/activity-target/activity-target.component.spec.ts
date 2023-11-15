import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTargetComponent } from './activity-target.component';

describe('ActivityTargetComponent', () => {
  let component: ActivityTargetComponent;
  let fixture: ComponentFixture<ActivityTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

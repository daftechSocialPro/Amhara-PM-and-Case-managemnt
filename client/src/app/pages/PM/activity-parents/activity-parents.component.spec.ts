import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityParentsComponent } from './activity-parents.component';

describe('ActivityParentsComponent', () => {
  let component: ActivityParentsComponent;
  let fixture: ComponentFixture<ActivityParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityParentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetActivityProgressComponent } from './get-activity-progress.component';

describe('GetActivityProgressComponent', () => {
  let component: GetActivityProgressComponent;
  let fixture: ComponentFixture<GetActivityProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetActivityProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetActivityProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

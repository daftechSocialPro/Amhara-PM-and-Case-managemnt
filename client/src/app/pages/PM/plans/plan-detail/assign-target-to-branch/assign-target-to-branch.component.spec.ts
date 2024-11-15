import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTargetToBranchComponent } from './assign-target-to-branch.component';

describe('AssignTargetToBranchComponent', () => {
  let component: AssignTargetToBranchComponent;
  let fixture: ComponentFixture<AssignTargetToBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTargetToBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTargetToBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

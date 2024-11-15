import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseIssueComponent } from './raise-issue.component';

describe('RaiseIssueComponent', () => {
  let component: RaiseIssueComponent;
  let fixture: ComponentFixture<RaiseIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaiseIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

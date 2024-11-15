import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaseDetailsComponent } from './update-case-details.component';

describe('UpdateCaseDetailsComponent', () => {
  let component: UpdateCaseDetailsComponent;
  let fixture: ComponentFixture<UpdateCaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

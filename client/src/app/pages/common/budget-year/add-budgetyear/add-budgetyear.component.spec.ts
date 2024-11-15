import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetyearComponent } from './add-budgetyear.component';

describe('AddBudgetyearComponent', () => {
  let component: AddBudgetyearComponent;
  let fixture: ComponentFixture<AddBudgetyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBudgetyearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBudgetyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

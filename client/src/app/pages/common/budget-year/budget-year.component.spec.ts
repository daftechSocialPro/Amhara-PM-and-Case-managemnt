import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetYearComponent } from './budget-year.component';

describe('BudgetYearComponent', () => {
  let component: BudgetYearComponent;
  let fixture: ComponentFixture<BudgetYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

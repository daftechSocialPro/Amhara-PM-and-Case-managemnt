import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasedashboardComponent } from './casedashboard.component';

describe('CasedashboardComponent', () => {
  let component: CasedashboardComponent;
  let fixture: ComponentFixture<CasedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasedashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

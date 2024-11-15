import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiManagmentComponent } from './kpi-managment.component';

describe('KpiManagmentComponent', () => {
  let component: KpiManagmentComponent;
  let fixture: ComponentFixture<KpiManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

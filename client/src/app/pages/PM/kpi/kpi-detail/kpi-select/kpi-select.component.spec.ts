import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSelectComponent } from './kpi-select.component';

describe('KpiSelectComponent', () => {
  let component: KpiSelectComponent;
  let fixture: ComponentFixture<KpiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

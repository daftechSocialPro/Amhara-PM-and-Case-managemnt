import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmZoneDashboardComponent } from './pm-zone-dashboard.component';

describe('PmZoneDashboardComponent', () => {
  let component: PmZoneDashboardComponent;
  let fixture: ComponentFixture<PmZoneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmZoneDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmZoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

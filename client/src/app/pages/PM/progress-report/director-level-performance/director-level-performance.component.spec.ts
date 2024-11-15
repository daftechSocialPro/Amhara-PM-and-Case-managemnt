import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorLevelPerformanceComponent } from './director-level-performance.component';

describe('DirectorLevelPerformanceComponent', () => {
  let component: DirectorLevelPerformanceComponent;
  let fixture: ComponentFixture<DirectorLevelPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorLevelPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorLevelPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

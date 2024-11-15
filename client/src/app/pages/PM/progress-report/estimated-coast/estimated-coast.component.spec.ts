import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedCoastComponent } from './estimated-coast.component';

describe('EstimatedCoastComponent', () => {
  let component: EstimatedCoastComponent;
  let fixture: ComponentFixture<EstimatedCoastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatedCoastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimatedCoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

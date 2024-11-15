import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeasurmentComponent } from './update-measurment.component';

describe('UpdateMeasurmentComponent', () => {
  let component: UpdateMeasurmentComponent;
  let fixture: ComponentFixture<UpdateMeasurmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMeasurmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMeasurmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

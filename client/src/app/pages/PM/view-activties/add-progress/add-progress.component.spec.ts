import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgressComponent } from './add-progress.component';

describe('AddProgressComponent', () => {
  let component: AddProgressComponent;
  let fixture: ComponentFixture<AddProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

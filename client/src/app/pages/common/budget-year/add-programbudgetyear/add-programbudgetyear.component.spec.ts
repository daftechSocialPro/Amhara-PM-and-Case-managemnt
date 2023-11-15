import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgrambudgetyearComponent } from './add-programbudgetyear.component';

describe('AddProgrambudgetyearComponent', () => {
  let component: AddProgrambudgetyearComponent;
  let fixture: ComponentFixture<AddProgrambudgetyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgrambudgetyearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgrambudgetyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
